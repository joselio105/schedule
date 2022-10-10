import createHtml, { createButton, setSelectBlock } from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";
import filters, { pageName } from "../filters/users.js";

export default attributes => {
    const commands = createHtml('nav', { class: "commands"});
    
    const buttonCreate = createButton(
        { 
            class: "button",
            title: `Registrar novo ${pageName}`,
         }, 
        { 
            src: "./src/assets/images/icons/plus-white.svg",
            alt: `novo ${pageName}`
         }
    );

    Object.keys(filters).forEach(filter => {        
        const options = filters[filter](attributes).options;
        const labelText = filters[filter](attributes).label;

        const selectAttributes = {
            id: filter,
            labelText,
            options 
        }
        attributes.hasOwnProperty(filter) ? selectAttributes.value = attributes[filter] : null;

        const selectBlock = setSelectBlock(commands, selectAttributes);
        
        selectBlock.children[1].addEventListener('change', filters[filter](attributes).handlerChange);
    })
    
    buttonCreate.addEventListener('click', createHandler);
    
    commands.appendChild(buttonCreate);
    
    return commands;
}

const createHandler = event => {
    renderRoute('scheduleForm', {
        type: event.currentTarget.value,
        id: ''
    });
}