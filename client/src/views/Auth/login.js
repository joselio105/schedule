import createElement from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js"
import FormBlockInputPassword from "../../components/FormBlockInputPassword.js";
import FormBlockInput from "../../components/FormBlockInput.js";
import { defaultView, renderRoute } from "../../routes/management.js";
import { get, post } from "../../api/server.js";
import { getAuth, getToken, isAuthenticated, logout, saveAuth, saveUser } from "../../tools/Auth.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";

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

export default attributes => {  
    if(attributes.message){
        setFeedbackMessage('Senha alterada com sucesso');
    }
    
    const form = createForm([
        FormBlockInput('email', 'Email', {
            placeholder: 'Digite seu Email',
            type: 'email',
            required: true
        }),
        FormBlockInputPassword('password', 'Digite sua senha', {
            placeholder: "Digite sua senha"
        }, false),
    ], buttons);
    form.addEventListener('submit', handleSubmit);

    const response = [
        createElement('h2', { text: 'Acesso à Área Restrita' }),
        setFeedback(),
        form
    ];
    
    return response;
}