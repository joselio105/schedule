import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import createHtml from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js";
import createFormInput from "../../components/FormBlockInput.js";
import { renderRoute } from "../../routes/management.js";
import { erase } from "../../api/server.js";
import { setLoading, unsetLoading } from "../../components/Loading.js";

export default async attributes => {
    const { viewname, title, id } = attributes;
    
    return [
        setTitle(title),
        setFeedback(),
        setForm(viewname, id)
    ];
}

const setTitle = title => {
    return createHtml('h2', { text: `Excluir ${title}?` });
}

const setForm = (viewname, id) => {
    const fields = [];
    const buttons = setButtons(viewname, id);

    const form = createForm(fields, buttons);
    form.addEventListener('submit', event => handleSubmit(event, schedule));

    return form;
}

const setButtons = (viewname, id) => {
    const buttons = [
        createHtml('button', {
            class: 'back',
            text: 'Não',
            id: viewname
        }),
        createHtml('button', { 
            type: 'submit', 
            classes: ['submit', 'delete'],
            value: id,
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