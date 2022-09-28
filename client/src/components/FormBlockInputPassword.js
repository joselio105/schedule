import creteElement from "../render/HtmlElement.js";

const requiriments = [
    {
        label: "Mínimo de 8 caractéres",
        validation: password => (password.length >= 8)
    },
    {
        label: "Presença de números",
        validation: password => (password.search(/[0-9]+/) != -1)
    },
    {
        label: "Presença de letras maiúsculas",
        validation: password => (password.search(/[A-Z]+/) != -1)
    },
    {
        label: "Presença de letras minúsculas",
        validation: password => (password.search(/[a-z]+/) != -1)
    },
    {
        label: "Presença de caractéres especiais",
        validation: password => (password.search(/[\!\@\#\$\%\&\*\(\)\[\]\{\}\,\.\;\:\\\?\/\|]+/) != -1)
    },
];

const feedback = creteElement('ul', { classes: ['feedback', 'hidden']});

const buttonView = creteElement('button', {
        text: "Visualizar Senha"
    });
    
const results = [];

export const passwordIsValid = () => (!results.includes(false) && results.length > 0);

const handleValidate = event => {
    const input = event.currentTarget;
    const password = input.value;
    results.length = 0;

    feedback.classList.remove('hidden');
    feedback.textContent = '';
    input.classList.add('unvalid');

    requiriments.forEach(requiriment => {
        const validationResult = requiriment.validation(password);

        const li = creteElement('li', { 
            text: requiriment.label,
            class: validationResult ? 'valid' : 'unvalid' 
        })
        feedback.appendChild(li)
        results.push(validationResult);
    })

    if(!results.includes(false)){
        feedback.classList.add('hidden');
        input.classList.remove('unvalid');
    }
}

export default (fieldName, labelText, inputAttrs={}) => {
    const container = creteElement('div', {class: 'password-block'});
    const label = creteElement('label', {for: fieldName, text:labelText});
    const input = creteElement('input', {
        id: fieldName,
        name: fieldName,
        type: 'password',
        autocomplete: 'new-password',
        ...inputAttrs
    });

    buttonView.addEventListener('mouseover', ()=>{
        input.setAttribute('type', "text");
    });
    buttonView.addEventListener('mouseleave', ()=>{
        input.setAttribute('type', "password");
    });

    input.addEventListener('keyup', handleValidate);

    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(feedback);
    container.appendChild(buttonView);

    return container;
}