import creteElement from "../render/HtmlElement.js";

export default (fieldName, labelText, inputAttrs={}) => {
    const container = creteElement('div', {class: 'input-block'});
    const label = creteElement('label', {for: fieldName, text:labelText});
    const input = creteElement('input', {
        id: fieldName,
        name: fieldName,
        ...inputAttrs
    });
    

    container.appendChild(label);
    container.appendChild(input);

    return container;
}