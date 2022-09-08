const createHtml = (tag, params={}) => {
    const element = document.createElement(tag);
    
    Object.keys(params).forEach(key => {
        if(key === 'classes'){
            params[key].forEach(className => {
                element.classList.add(className);
            })
        }else if(key === 'text'){
            element.textContent = params[key];
        }else{
            element.setAttribute(key, params[key]);
        }

    })

    return element;
}

export const createButton = ( buttonAttrs, iconAttrs=null ) => {
    const button = createHtml('button', buttonAttrs);

    if(iconAttrs !== null){
        const icon = createHtml('img', iconAttrs);
        button.appendChild(icon);
    }

    return button;
}

export const setSelectBlock = (container, attributes) => {
    const { id, labelText, value, options } = attributes;

    const wrapper = createHtml('div', { class: 'select-block' });
    const label = createHtml('label', { for: id, text: labelText });
    const select = createHtml('select', {
        id,
        name: id,
    });

    const optionTags = options.map( option => {
        if(value === option.value){
            option.selected = 'select';
        }

        return createHtml('option', option);
    });

    optionTags.forEach( optionTag => select.appendChild(optionTag));
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    container.appendChild(wrapper);

    return wrapper;
}

export default createHtml;