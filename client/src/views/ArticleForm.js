import createElement from "../render/HtmlElement.js";
import createFom from "../components/Form.js";
import setFeedback, { setFeedbackMessage } from "../components/Feedback.js";
import FormBlockInput from "../components/FormBlockInput.js";
import { renderRoute } from "../routes/management.js";

export default async attributes => {
    let article = {};
    
    if(attributes.id){
        article = await get(`articles&id=${attributes.id}`);
    }

    return [
        createElement('h2', {text: 'Artigo'}),
        setFeedback(),
        createForm(article)
    ];
}

const createForm = article => {
    const fields = getFields(article);
    const buttons = getButtons(article);
    const form = createFom(fields, buttons);

    return form;
}

const getFields = article => {
    return [
        FormBlockInput('titulo', 'Título', {
            required: true,
            value: (article.titulo ? article.titulo : ''),
            placeholder: 'Digite um título para o artigo'
        }),
        getTextAreaBlock()
    ];
}

const getButtons = article => {
    const buttons = [
        createElement('button', {
            class: 'back',
            text: 'voltar',
            id: 'articles'
        }),
        createElement('button', { 
            type: 'submit', 
            classes: ['submit', (article.id ? 'update' : 'create')],
            value: article.id,
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

const getTextAreaBlock = () => {
    const block = createElement('div', { class: 'textarea-block'});
    const input = createElement('textarea', { class: 'edit-input'});
    const header = createElement('div', { class: 'edit-buttons' });
    const code = createElement('div', { classes: ['edit-output', 'edit-code'] });
    const showed = createElement('div', { classes: ['edit-output', 'edit-show'] });
    const result = {
        typed: [],
        htmlCode: document.createElement('div')
    };

    const line = document.createElement('p');
    input.addEventListener('keyup', event => {
        const key = event.key;
        console.log(event)
        result.typed.push(key);

        if(key === 'Enter'){
            console.log('new Line')
        }else{
            line.textContent += key;
        }
    })
    result.htmlCode.appendChild(line);

    Object.keys(result.htmlCode.children).forEach( key => {
        const line = result.htmlCode.children[key];
        showed.appendChild(line);
    })
    
    block.appendChild(input);
    block.appendChild(code);
    block.appendChild(showed);

    return block;
}