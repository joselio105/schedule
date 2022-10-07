import createHtml, { createButton, setSelectBlock } from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

const options = [
    {
        value: 0,
        text: "Semana",
        type: "week"
    },
    {
        value: 1,
        text: "Mês",
        type: "month"
    }
];

export default (calendarType) => {
    const commands = createHtml('nav', { class: "commands"});
    
    const value = options.find(option => option.type === calendarType).value;
    const buttonCreate = createButton(
        { 
            class: "button",
            title: "Criar novo evento",
            value: options[value].type
         }, 
        { 
            src: "./src/assets/images/icons/plus-white.svg",
            alt: "novo evento"
         }
    );

    const selectBlock = setSelectBlock(commands, {
        id: "view",
        labelText: "Visualizar Calendário",
        value,
        options 
    });
    buttonCreate.addEventListener('click', createHandler);
    selectBlock.children[1].addEventListener('change', changeHandler);
    
    commands.appendChild(buttonCreate);
    
    return commands;
}

const createHandler = event => {
    renderRoute('scheduleForm', {
        type: event.currentTarget.value,
        id: ''
    });
}

const changeHandler = event => {
    const render = [
        'week',
        'month'
    ];

    const attributes = {
        type: render[event.currentTarget.value]
    }
    
    renderRoute('schedule', attributes);
}