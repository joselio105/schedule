import creteElement from "../render/HtmlElement.js";

const feedback = creteElement('span');

const buttonView = creteElement('button', {
        text: "Visualizar Senha"
    });

export default (fieldName, labelText, inputAttrs={}) => {
    const container = creteElement('div', {class: 'password-block'});
    const label = creteElement('label', {for: fieldName, text:labelText});
    const input = creteElement('input', {
        id: fieldName,
        name: fieldName,
        type: 'password',
        ...inputAttrs
    });

    buttonView.addEventListener('mouseover', ()=>{
        input.setAttribute('type', "text");
    });
    buttonView.addEventListener('mouseleave', ()=>{
        input.setAttribute('type', "password");
    });

    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(feedback);
    container.appendChild(buttonView);

    return container;
}