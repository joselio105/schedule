import createHtml, { setSelectBlock } from "./HtmlElement.js";
import renderSchedule from "./schedule.js";

const options = [
    {
        value: 0,
        text: "Semana"
    },
    {
        value: 1,
        text: "Mês"
    }
];

export default container => {
    const commands = createHtml('nav', { class: "commands"});
    
    const selectBlock = setSelectBlock(commands, {
        id: "view",
        labelText: "Visualizar Calendário",
        value: 0,
        options 
    });
    selectBlock.children[1].addEventListener('change', changeHandler);
    container.appendChild(commands);
}

const changeHandler = event => {
    const render = [
        'week',
        'month'
    ];
    renderSchedule(render[event.currentTarget.value]);
}