import createHtml, { setSelectBlock } from "./HtmlElement.js";
import renderSchedule from "../views/Schedule.js";
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
    
    const selectBlock = setSelectBlock(commands, {
        id: "view",
        labelText: "Visualizar Calendário",
        value,
        options 
    });
    selectBlock.children[1].addEventListener('change', changeHandler);
    
    return commands;
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