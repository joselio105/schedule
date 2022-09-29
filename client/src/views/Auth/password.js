import { patch } from "../../api/server.js";
import { renderRoute } from "../../routes/management.js";
import createElement, { createTextNode } from "../../render/HtmlElement.js";
import createForm from "../../components/Form.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import FormBlockInputPassword, { passwordIsValid } from "../../components/FormBlockInputPassword.js";

const fields = [
    FormBlockInputPassword('password', 'Digite sua nova senha', {
        placeholder: "Digite sua nova senha"
    }),
    createElement('input', {
        type: "hidden",
        name: "token",
        id: "token"
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

const getUser = token => JSON.parse(atob(token));

export default attributes => {
    const { token } = attributes;
    const user = getUser(token);

    const form = createForm(fields, buttons);
    fields[1].value=token;

    form.addEventListener('submit', handleSubmit);

    const { minutes, seconds } = getTime(user.expiration);
    const timer = createTimer(minutes, seconds);
    
    if(timer.children.length > 0){
        setInterval(() => {
            const { minutes, seconds } = getTime(user.expiration);  

            timer.children[0].textContent = minutes;
            timer.children[1].textContent = seconds;
        }, 1000);
    }
    return [
        createElement('h2', { text: '(re)Cadastre sua senha' }),
        timer,
        setFeedback(),
        form
    ]
}

buttons[0].addEventListener('click', event=>{
    renderRoute('askPassword');
})

const handleSubmit = async event => {
    event.preventDefault();

    if(passwordIsValid()){
        const form = new FormData(event.currentTarget);
        const { id } = getUser(form.get('token'));

        const result = await patch('password', form, {
            name: 'id',
            value: id
        })

        if(result.error){
            setFeedbackMessage(result.error);
        }else{
            renderRoute('login', { message: result});
        }
    }
}

const createTimer = (minutes, seconds) => {

    const timer = createElement('div', { class: "timer"});
    const timerInner = [
        createTextNode("Faltam"),
        createElement('time', { text: minutes}),
        createTextNode(" minutos e "),
        createElement('time', { text: seconds}),
        createTextNode(" segundos para o link expirar")
    ];

    if(minutes + seconds > 0){
        timerInner.forEach(inner => timer.appendChild(inner));
    }else{
        timer.appendChild(createTextNode("Link expirado"));
        timer.classList.add('gone');
    }

    return timer;
}

const getTime = expiration => {
    const now = new Date().valueOf();
    const diference = expiration - now;
    const minutes = Math.floor(diference / (1000 * 60));
    const seconds = Math.floor(diference / 1000 - minutes * 60);

    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    }
}