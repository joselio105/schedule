import { getEvent } from "../api/events.js";
import createHtml from "../render/HtmlElement.js"
import { renderRoute } from "../routes/management.js";
import { getMonth } from "../tools/Date.js";

export default async attributes => {
    const event = getEvent(parseInt(attributes.id));
    
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
    const dateObject = new Date(`${event.day} ${event.start}`);
    const dateObjectStop = new Date(`${event.day} ${event.stop}`);
    const month = getMonth(dateObject.valueOf()).replace('/', ' de ');
    const scheduleContainer = createHtml('div', { class: "schedule-info" });
    
    const contents = [
        document.createTextNode("Evento agendado para o dia "),
        createHtml('time', { 
            text: `${dateObject.getDate()} de ${month}`,
            dateTime: event.day
        }),
        document.createTextNode(". Das "),
        createHtml('time', {
            text: `${dateObject.getHours()}h${dateObject.getMinutes()}`,
            dateTime: event.start
        }),
        document.createTextNode(" às "),
        createHtml('time', {
            text: `${dateObjectStop.getHours()}h${dateObjectStop.getMinutes()}`,
            dateTime: event.start
        }),
        document.createTextNode(".")
    ];

    contents.forEach( content => scheduleContainer.appendChild(content));
    return scheduleContainer;
}

const setButtons = (event, attributes) => {
    const buttonsWrapper = createHtml('nav', { class: "commands" });
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
            value: event.id,
            text: "Excluir"
        })
    ];

    setActions(buttons, event);

    buttons.forEach( button => buttonsWrapper.appendChild(button));
    return buttonsWrapper;
}

const setActions = (buttons, event) => {
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

const updateHandler = event => {}

const deleteHandler = event => {}