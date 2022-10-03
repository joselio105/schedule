import { getEvent } from "../../api/events.js";
import { setLoading, unsetLoading } from "../../components/Loading.js";
import createHtml from "../../render/HtmlElement.js"
import { renderRoute } from "../../routes/management.js";
import { intToHoursString, months } from "../../tools/Date.js";

export default async attributes => {
    setLoading();
    const event = await getEvent(parseInt(attributes.id));
    unsetLoading();
    
    return [
        setTitle(event),
        setDescription(event),
        setSchedule(event),
        setButtons(event, attributes)
    ];
}

const setTitle = event => {
    return createHtml('h2', { text:  event.title });
}

const setDescription = event => {
    return createHtml('p', {
        text: event.description,
        class: 'description'
    })
}

const setSchedule = event => {
    const [year, month, day] = event.day.split('-');
    // const dateObject = new Date(`${event.day} ${event.start}`);
    // const dateObjectStop = new Date(`${event.day} ${event.stop}`);
    const monthString = months[parseInt(month)-1];
    const scheduleContainer = createHtml('div', { class: "schedule-info" });
    
    const contents = [
        document.createTextNode("Evento agendado para o dia "),
        createHtml('time', { 
            text: `${day} de ${monthString} de ${year}`,
            dateTime: event.day
        }),
        document.createTextNode(". Das "),
        createHtml('time', {
            text: intToHoursString(event.start),
            dateTime: event.start
        }),
        document.createTextNode(" às "),
        createHtml('time', {
            text: intToHoursString(event.stop),
            dateTime: event.start
        }),
        document.createTextNode(".")
    ];

    contents.forEach( content => scheduleContainer.appendChild(content));
    return scheduleContainer;
}

const setButtons = (event, attributes) => {
    const buttonsWrapper = createHtml('nav', { class: "commands" });
    event.viewType = attributes.type;

    const buttons = [
        createHtml('button', {
            id: "button-back",
            classes: ["button"],
            value: attributes.type,
            text: "Voltar"
        }),
        createHtml('button', {
            id: "button-update",
            classes: ["button"],
            value: event.id,
            text: "Editar"
        }),
        createHtml('button', {
            id: "button-delete",
            classes: ["button", "delete"],
            value: JSON.stringify(event),
            text: "Excluir"
        })
    ];

    setActions(buttons);

    buttons.forEach( button => buttonsWrapper.appendChild(button));
    return buttonsWrapper;
}

const setActions = buttons => {
    const buttonBack = buttons.find(button => button.id === "button-back");
    const buttonUpdate = buttons.find(button => button.id === "button-update");
    const buttonDelete = buttons.find(button => button.id === "button-delete");

    buttonBack.addEventListener('click', backHandler);
    buttonUpdate.addEventListener('click', updateHandler);
    buttonDelete.addEventListener('click', deleteHandler);
}

const backHandler = event => {
    renderRoute("schedule", {type: event.currentTarget.value});
}

const updateHandler = event => {
    renderRoute("scheduleForm", {id: event.currentTarget.value});
}

const deleteHandler = event => {
    const schedule = JSON.parse(event.currentTarget.value);
    renderRoute(
        "scheduleDelete", 
        {
            event: schedule
        }
        )
}