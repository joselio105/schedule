import createElement from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js"
import FormBlockInputPassword from "../../components/FormBlockInputPassword.js";
import ButtonSubmit from "../../components/ButtonSubmit.js";
import FormBlockInput from "../../components/FormBlockInput.js";
import { defaultView, renderRoute } from "../../routes/management.js";
import { get, post } from "../../api/server.js";
import { isAuthenticated, logout, saveAuth, saveUser } from "../../tools/Auth.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import { setLoading, unsetLoading } from "../../components/Loading.js";

const buttons = [
    createElement('button', {
        text: '(re)Cadastrar senha'
    }),
    ButtonSubmit('Fazer Login')
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
    
    setLoading();
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
    unsetLoading();
}

export default attributes => {  
    document.title = "ARQ/UFSC | Autenticação";

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