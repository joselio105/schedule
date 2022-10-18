import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import createHtml from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js";
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
    const fields = [
        createHtml('input', {
            type: 'hidden',
            value: id,
            id: 'id',
            name: 'id'
        })
    ];
    const buttons = setButtons(viewname, id);

    const form = createForm(fields, buttons);
    form.addEventListener('submit', event => handleSubmit(event, viewname));

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

const handleSubmit = async (event, controller) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setLoading();
    const result = await erase(
        controller, 
        {
            name: 'id',
            value: form.get('id')
        }
    );

     if(result.hasOwnProperty('error')){
         setFeedbackMessage(result.error);
     }else{
         renderRoute(controller);
     } 
    
    unsetLoading();
       
}