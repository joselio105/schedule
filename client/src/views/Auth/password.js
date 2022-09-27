import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import createForm from "../../components/Form.js"
import FormBlockInput from "../../components/FormBlockInput.js";
import FormBlockInputPassword from "../../components/FormBlockInputPassword.js";
import createElement, { createTextNode } from "../../render/HtmlElement.js";
import { renderRoute } from "../../routes/management.js";

const fields = [
    FormBlockInputPassword('password', 'Digite sua nova senha', {
        placeholder: "Digite sua nova senha",
        autocomplete: "new-password"
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

    const { minutes, seconds } = getTime(attributes.expiration);
    const timer = createTimer(minutes, seconds);

    console.log(timer.children[0].textContent)
    setInterval(() => {
        const { minutes, seconds } = getTime(attributes.expiration);
        timer.children[0].textContent = minutes
        timer.children[1].textContent = seconds
    }, 1000);
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

const handleSubmit = event => {
    event.preventDefault();

    //PATCH
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