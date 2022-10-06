import createElement, { createButton } from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

export default (title, createTaget) => {
    const pageHeader = createElement('header');
    const titleTag = createElement('h2', {text: title});

    pageHeader.appendChild(titleTag);
    pageHeader.appendChild(createCommands(title, createTaget));
    
    return pageHeader;
}

const createCommands = (title, createTaget) => {
    const commands = createElement('nav', { class: "commands"});
    
    const buttonLabel = (title.substr(-2, 2)==='es' ? title.substr(0, title.length-2) : title.substr(0, title.length-1));
    
    const buttonCreate = createButton(
        { 
            class: "button",
            title: "Criar novo " + buttonLabel,
            value: ''
         }, 
        { 
            src: "./src/assets/images/icons/plus.svg",
            alt: buttonLabel
         }
    );

    buttonCreate.addEventListener('click', event => {
        event.preventDefault();
        renderRoute(createTaget);
    });

    commands.appendChild(buttonCreate)

    return commands;
}