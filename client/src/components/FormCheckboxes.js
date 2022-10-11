import createElement from "../render/HtmlElement.js";

export default (titleText, options=[]) => {
    const container = createElement('fieldset', { class: "checkboxes-container" });
    const title = createElement('legend', { text: titleText});
    container.appendChild(title);

    options.forEach( (option, key) => {
        const inputProperties = {
            type: 'checkbox',
            id: option.id + key,
            name: option.id,
            value: option.value
        };
        if(option.checked){
            inputProperties.checked = 'checked';
        }

        const label = createElement('label', { for: option.id + key, text: option.label });
        const input = createElement('input', inputProperties);
        const span = createElement('span', { class: "checkmark"})

        label.appendChild(input);
        label.appendChild(span);
        container.appendChild(label);
    })

    return container;
}