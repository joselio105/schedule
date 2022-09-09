import { getEvent } from "../api/events.js";
import setFeedback, { setFeedbackMessage } from "../components/Feedback.js";
import createHtml, { setSelectBlock } from "../render/HtmlElement.js";
import createForm from "../components/Form.js";
import createFormField from "../components/FormBlockInput";
import createFormSelect from "../components/FormBlockSelect";
import { renderRoute } from "../routes/management.js";

export default async attributes => {
    let event = {};
    
    if(attributes.id.length > 0){
        event = getEvent(parseInt(attributes.id));
    }
    
    return [
        setTitle(),
        setFeedback(),
        setForm(event)
    ];
}

const setTitle = () => {
    return createHtml('h2', { text: "Novo Agendamento" });
}

const setForm = event => {
    const fields = setFields(event);
    const buttons = setButtons(event);

    return createForm(fields, buttons);
}

const setFields = event => {
    console.log(event)
    return [
        createFormField(
            "title",
            "Título",
            {
                required: true,
                placeholder: "Digite o título do agendamento",
                value: event.title ?  event.title : ''
            }
        ),
        createFormField(
            "description",
            "Descrição (opcional)",
            {
                placeholder: "Digite a descrição do agendamento",
                class: "description",
                value: event.title ?  event.title : ''
            }
        ),
        createFormField(
            "day",
            "Dia",
            {
                placeholder: "Defina a data do agendamento",
                type: "date",
                required: true,
                value: event.day ?  event.day : ''
            }
        ),
        createFormField(
            "start",
            "Horário de início",
            {
                required: true,
                type: "time",
                value: event.start ?  event.start : ''
            }
        ),
        createFormField(
            "stop",
            "Horário de termino",
            {
                required: true,
                type: "time",
                value: event.stop ?  event.stop : ''
            }
        ),
        createFormField(
            "repeatTimes",
            "Quantidade de repetições",
            {
                type: "number",
                step: 1,
                value: event.repeat && event.repeat.times ? event.repeat.times : 0
            }
        ),
        createHtml('span', { text: "####### Não esqueça do tipo de repetição #######"})
    ];
}

const setButtons = event => {
    const buttons = [
        createHtml('button', {
            class: 'back',
            text: 'voltar',
            id: 'schedule'
        }),
        createHtml('button', { 
            type: 'submit', 
            classes: ['submit', (event.id ? 'update' : 'create')],
            value: event.id,
            text: 'enviar'
        })
    ];

    buttons[0].addEventListener('click', handleBack);
    buttons[1].addEventListener('click', handleSubmit);

    return buttons;
}



const handleBack = event => {
    event.preventDefault();
    const backTo = event.currentTarget.id;
    renderRoute(backTo);
}

const handleSubmit = event => {}