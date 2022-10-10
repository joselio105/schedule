import creteElement from "../render/HtmlElement.js";

export default (fieldName, labelText, values, inputAttrs={}) => {

    const container = creteElement('div', {class: 'input-block'});
    const label = creteElement('label', {for: fieldName, text:labelText});
    const select = creteElement('select', {
        id: fieldName,
        name: fieldName,
        ...inputAttrs
    });

    Object.keys(values).forEach(text => {
        const value = values[text];
        const option = creteElement('option', {
            value,
            text
        });
        if(inputAttrs.hasOwnProperty('value')){
            if(inputAttrs.value === value){
                option.selected = 'select';
            }
        }

        select.appendChild(option);
    });
    

    container.appendChild(label);
    container.appendChild(select);

    return container;
}