import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import createHtml from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js";
import createFormInput from "../../components/FormBlockInput.js";
import { renderRoute } from "../../routes/management.js";
import { erase } from "../../api/server.js";
import { setLoading, unsetLoading } from "../../components/Loading.js";

export default async attributes => {
    const { event } = attributes;
    
    return [
        setTitle(event),
        setFeedback(),
        setForm(event)
    ];
}

const setTitle = event => {
    return createHtml('h2', { text: `Excluir ${event.title}?` });
}

const setForm = schedule => {
    const fields = [
        createFormInput(
            'allEvents', 
            'Excluir toda a sequencia de repetições?', 
            {
                type: 'checkbox'
            }
        )
    ];
    const buttons = setButtons(schedule);

    const form = createForm(fields, buttons);
    form.addEventListener('submit', event => handleSubmit(event, schedule));

    return form;
}

const setButtons = event => {
    const buttons = [
        createHtml('button', {
            class: 'back',
            text: 'Não',
            id: 'schedule',
            value: event.viewType
        }),
        createHtml('button', { 
            type: 'submit', 
            classes: ['submit', 'delete'],
            value: event.id,
            text: 'Excluir'
        })
    ];

    buttons[0].addEventListener('click', handleBack);

    return buttons;
}

const handleBack = event => {
    event.preventDefault();
    const backTo = event.currentTarget.id;
    
    renderRoute(backTo, { type: event.currentTarget.value });
}

const handleSubmit = async (event, schedule) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const allEvents = form.get('allEvents') !== null;

    setLoading();
    if(allEvents && schedule.parent_id){
        const result = await erase(
            'schedules', 
            {
                name: 'id',
                value: schedule.parent_id
            },
            { 
                parent_id: schedule.parent_id 
            }
        );

        if(result.hasOwnProperty('error')){
            setFeedbackMessage(result.error);
        }else{
            renderRoute('schedule', { result, type: schedule.viewType});
        } 
    }else{
        const result = await erase(
            'schedules', 
            {
                name: 'id',
                value: schedule.id
            }
        );

        if(result.hasOwnProperty('error')){
            setFeedbackMessage(result.error);
        }else{
            renderRoute('schedule', { result, type: schedule.viewType});
        } 
    } 
    unsetLoading();
       
}