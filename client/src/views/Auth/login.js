import createElement from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js"
import FormBlockInput from "../../components/FormBlockInput.js";
import { defaultView, renderRoute } from "../../routes/management.js";
import { get, post } from "../../api/server.js";
import { getAuth, getUser, isAuthenticated, logout, saveAuth, saveUser } from "../../tools/Auth.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";

const fields = [
    FormBlockInput('email', 'Email', {
        placeholder: 'Digite seu Email',
        type: 'email',
        required: true
    }),
    FormBlockInput('password', 'Senha', {
        type: 'password',
        placeholder: 'Digite sua senha',
        required: true
    })
];

const buttons = [
    createElement('button', {
        text: '(re)Cadastrar senha'
    }),
    createElement('button', {
        type: 'submit',
        class: 'submit',
        text: 'Fazer login'
    })
];

const feedback = setFeedback();

buttons[0].addEventListener('click', event=>{
    renderRoute('askPassword');
})

const handleSubmit = async event => {
    event.preventDefault();
    if(isAuthenticated()){
        logout();
    }
    const formData = new FormData(event.target);
    
    const response = await post('auth', formData);

    if(response.error){
        setFeedbackMessage(response.error);
    }else{
        if(response.token){
            saveAuth(response);
            const user = await get('auth');
            
            if(user.error){
                setFeedbackMessage(response.error);
            }else{
                saveUser(user);
                renderRoute(defaultView);
            }
        }else{
            setFeedbackMessage("");
        }
    }
}

export default () => {  
    console.log(
        getAuth(),
        getUser()
    )
    const form = createForm(fields, buttons);
    form.addEventListener('submit', handleSubmit);

    const response = [
        createElement('h2', { text: 'Acesso à Área Restrita' }),
        setFeedback(),
        form
    ];
    
    return response;
}