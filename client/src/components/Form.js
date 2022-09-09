import createElement from "../render/HtmlElement.js";

export default (fields, buttons) => {
    const form = createElement('form');
    const buttonsWrapper = getButtonsWrapper(buttons);

    fields.forEach( field =>  form.appendChild(field));
    form.appendChild(buttonsWrapper);

    return form;
}

const getButtonsWrapper = buttons => {
    const buttonsWrapper = createElement('div', {class: 'form-buttons-wrapper'});

    buttons.forEach(button => buttonsWrapper.appendChild(button));
    return buttonsWrapper;
}