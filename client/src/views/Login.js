import createElement from "../render/HtmlElement.js";
import createForm from "../components/Form.js"
import FormBlockInput from "../components/FormBlockInput.js";
import { defaultView, renderRoute } from "../routes/management.js";
import { get, post } from "../api/server.js";
import { isAuthenticated, logout, saveAuth, saveUser } from "../tools/Auth.js";
import setFeedback, { setFeedbackMessage } from "../components/Feedback.js";

const fields = [
    FormBlockInput('email', 'Email', {
        placeholder: 'Digite seu Email',
        type: 'email',
        required: true
    }),
    FormBlockInput('senha', 'Senha', {
        type: 'password',
        placeholder: 'Digite sua senha',
        required: true
    })
];

const buttons = [
    createElement('button', {
        type: 'submit',
        class: 'submit',
        text: 'Enviar'
    })
];

const handleSubmit = event => {
    event.preventDefault();
    if(isAuthenticated()){
        logout();
    }
    
    post('auth', event.target)
    .then(response => {
        if(response.error){
            feedback.classList.remove('hiden');
            feedback.textContent = response.error;
        }else{
            if(response.token){
                saveAuth(response);
                get('auth')
                .then(response => {
                    if(response.error){
                        setFeedbackMessage(response.error);
                    }else{
                        saveUser(response);
                        renderRoute(defaultView);
                    }
                }).catch(response => {
                    setFeedbackMessage(response.error);
                });
            }
        }
    });
}

export default attributes => {  
    const form = createForm(fields, buttons);
    form.addEventListener('submit', handleSubmit);

    const response = [
        createElement('h2', { text: 'Acesso à Área Restrita' }),
        setFeedback(),
        form
    ];
    
    return response;
}