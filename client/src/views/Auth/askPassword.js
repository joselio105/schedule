import { post, put } from "../../api/server.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import createForm from "../../components/Form.js"
import FormBlockInput from "../../components/FormBlockInput.js";
import createElement from "../../render/HtmlElement.js";
import { renderRoute } from "../../routes/management.js";
import { logout } from "../../tools/Auth.js";

const fields = [
    FormBlockInput('matricula', 'Siape', {
        placeholder: "Digite sua matrícula SIAPE",
        required: true
    })
];

const buttons = [
    createElement('button', {
        text: 'Voltar'
    }),
    createElement('button', {
        type: 'submit',
        class: 'submit',
        text: 'Enviar'
    })
];

export default attributes => {
    const form = createForm(fields, buttons);
    form.addEventListener('submit', handleSubmit);
    
    return [
        createElement('h2', { text: '(re)Cadastre sua senha - Solicitação' }),
        setFeedback(),
        form
    ]
}

buttons[0].addEventListener('click', event=>{
    renderRoute('login');
})

const handleSubmit = async event => {
    event.preventDefault();
    logout();
    
    const formData = new FormData(event.target);
    
    const response = await post('password', formData);
    console.log(response)
    setFeedbackMessage(response.message);
}