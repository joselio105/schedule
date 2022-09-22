import { getEvent } from "../api/events.js";
import setFeedback, { setFeedbackMessage } from "../components/Feedback.js";
import createHtml, { setSelectBlock } from "../render/HtmlElement.js";
import createForm from "../components/Form.js";
import createFormField from "../components/FormBlockInput";
import createFormSelect from "../components/FormBlockSelect";
import { renderRoute } from "../routes/management.js";
import { intToHoursString } from "../tools/Date.js";
import { put } from "../api/server.js";

export default async attributes => {
    const { type } = attributes;
    let event = {};

    if(attributes.id.length > 0){
        event = await getEvent(parseInt(attributes.id));
    }
    
    return [
        setTitle(),
        setFeedback(),
        setForm(event, type)
    ];
}

const setTitle = () => {
    return createHtml('h2', { text: "Novo Agendamento" });
}

const setForm = (schedule, type) => {
    const fields = setFields(schedule);
    const buttons = setButtons(schedule, type);

    const form = createForm(fields, buttons);
    form.addEventListener('submit', event => handleSubmit(event, schedule.id));

    return form;
}

const setFields = event => {
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
                value: event.title ?  event.description : ''
            }
        ), 
        getScheduleFields(event),       
        getRepeatFields(event)
    ];
}

const getScheduleFields = event => {
    const fieldSet = createHtml('fieldset');
    const legend = createHtml('legend', { text: "Dados do agendamento"});
    
    const fields = [
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
                value: event.start ?  intToHoursString(event.start).replace('h', ':') : ''
            }
        ),
        createFormField(
            "stop",
            "Horário de termino",
            {
                required: true,
                type: "time",
                value: event.stop ?  intToHoursString(event.stop).replace('h', ':') : ''
            }
        ),
    ];

    fieldSet.appendChild(legend);
    fields.forEach( field => fieldSet.appendChild(field));

    return fieldSet;
}

const getRepeatFields = event => {   
    const fieldSet = createHtml('fieldset');
    const legend = createHtml('legend', { text: "Repetir evento"});

    const fields = [
        setCheckBox(),
        createFormField('repaetTimes', "Quantidade de repetições", {
            type: "number",
            step: 1, 
            min: 1,
            value: 1
        }),
        createFormSelect('repeatFrequency', "Frequência", 
        {
            "Diário": "day",
            "Semanal": "week",
            "Mensal": "month",
            "Anual": "year"
        })
    ];

    fieldSet.appendChild(legend);
    fields.forEach( field => fieldSet.appendChild(field));

    if(!event.hasOwnProperty('id')){
        return fieldSet;
    }
    
    return createHtml('div');
}

const setCheckBox = () => {
    const label = createHtml('label', { 
        for: "repeat", 
        classes: ["check-box"],
        text: "Repetir"
    });
    const input = createHtml('input', { id: "repeat", type: "checkbox" });

    input.addEventListener('change', repeatHandler);

    label.appendChild(input);

    return label;
}

const repeatHandler = event => {
    const fieldsetChildren = event.path[2].children;
    const isChecked = event.currentTarget.checked;
    
    if(isChecked){
        fieldsetChildren[2].classList.remove('hide');
        fieldsetChildren[3].classList.remove('hide');
    }else{
        fieldsetChildren[2].classList.add('hide');
        fieldsetChildren[3].classList.add('hide');     
    }
}

const setButtons = (event, type) => {
    const buttons = [
        createHtml('button', {
            class: 'back',
            text: 'voltar',
            id: 'schedule',
            value: type ? type : 'month'
        }),
        createHtml('button', { 
            type: 'submit', 
            classes: ['submit', (event.id ? 'update' : 'create')],
            value: event.id,
            text: 'enviar'
        })
    ];

    buttons[0].addEventListener('click', handleBack);
    // buttons[1].addEventListener('click', handleSubmit);

    return buttons;
}

const handleBack = event => {
    event.preventDefault();
    const backTo = event.currentTarget.id;
    
    renderRoute(backTo, { type: event.currentTarget.value });
}

const handleSubmit = async (event, id) => {
    event.preventDefault();

    const result = await put('schedules', event.currentTarget, id);

    console.log(result)
}