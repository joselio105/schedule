import createElement from "../../render/HtmlElement.js";
import createFom from "../../components/Form.js";
import FormBlockInput from "../../components/FormBlockInput.js";
import FormBlockSelect from "../../components/FormBlockSelect.js";
import { get, post, put } from "../../api/server.js";
import { renderRoute } from "../../routes/management.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";

export default async attributes => {
    let user = {};
    
    if(attributes.id){
        user = await get(`users&id=${attributes.id}`);
    }

    return [
        createElement('h2', {text: 'Usuário'}),
        setFeedback(),
        createForm(user)
    ];
}

const createForm = user => {
    const fields = getFields(user);
    const buttons = getButtons(user);
    const form = createFom(fields, buttons);

    return form;
}

const getFields = user => {
    return [
        FormBlockInput('nome', 'Nome', {
            required: true,
            value: (user.primeiroNome ? user.primeiroNome : ''),
            placeholder: 'Digite seu nome'
        }),
        FormBlockInput('sobrenome', 'Sobrenome', {
            required: true,
            value: (user.sobrenome ? user.sobrenome : ''),
            placeholder: 'Digite seu sobrenome'
        }),
        FormBlockInput('email', 'E-Mail', {
            type: 'email', 
            required: true,
            value: (user.email ? user.email : ''),
            placeholder: 'Digite seu email'
        }),
        FormBlockInput('SIAPE', 'Siape', {
            required: true,
            value: (user.SIAPE ? user.SIAPE : ''),
            placeholder: 'Digite sua matrícula SIAPE'
        }),
        FormBlockInput('MASIS', 'Masis', {
            required: true,
            value: (user.MASIS ? user.MASIS : ''),
            placeholder: 'Digite sua matrícula MASIS'
        }),
        FormBlockInput('CPF', 'Cpf', {
            required: true,
            value: (user.CPF ? user.CPF : ''),
            placeholder: 'Digite seu CPF'
        }),
        FormBlockInput('nascimento', 'Nascimento', {
            type: 'date',
            required: true,
            value: (user.nascimento ? user.nascimento : ''),
            placeholder: 'Digite sua data de nascimento'
        }),
        FormBlockSelect('tipo', 'Tipo', {
            'Docente': 'sdo',
            'Tecnico Administrativo': 'sta'
        }),
        FormBlockInput('site', 'Site', {
            type: 'url',
            value: (user.site ? user.site : ''),
            placeholder: 'Digite a URL do seu site'
        }),
        FormBlockInput('Memorial', 'Memorial', {
            type: 'url',
            value: (user.Memorial ? user.Memorial : ''),
            placeholder: 'Digite a URL do seu memorial'
        }),
        FormBlockInput('youtube', 'Youtube', {
            type: 'url',
            value: (user.youtube ? user.youtube : ''),
            placeholder: 'Digite a URL do seu canal do youtube'
        })        
    ];
}

const getButtons = user => {
    const buttons = [
        createElement('button', {
            class: 'back',
            text: 'voltar',
            id: 'users'
        }),
        createElement('button', { 
            type: 'submit', 
            classes: ['submit', (user.id ? 'update' : 'create')],
            value: user.id,
            text: 'enviar'
        })
    ];

    buttons[0].addEventListener('click', handleBack);
    buttons[1].addEventListener('click', handleSubmit);

    return buttons;
}

const handleSubmit = event => {
    
    const action = event.currentTarget.classList[1];
    const id = event.currentTarget.value;
    const form = event.path[2];
    
    const actions = {
        create: form => {
            post('users', form)
            .then( result => {
                if(result.error){
                    setFeedbackMessage(result.error);
                }else{
                    setFeedbackMessage('Usuário cadastrado com sucesso');
                    renderRoute('users');
                }
            })
        },
        update: form => {
            put('users', form, {
                name: 'servidorID',
                value: id
            })
            .then( result => {
                if(result.error){
                    setFeedbackMessage(result.error);
                }else{
                    setFeedbackMessage('Usuário atualizado com sucesso');
                    renderRoute('users');
                }
            })
        }
    };

    actions[action](form);

    event.preventDefault();
}

const handleBack = event => {
    const backTo = event.currentTarget.id;
    renderRoute(backTo);
}