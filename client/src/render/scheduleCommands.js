import createHtml, { setSelectBlock } from "./HtmlElement.js";

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
    
    setSelectBlock(commands, {
        id: "view",
        labelText: "Visualizar Calendário",
        value: 0,
        options 
    });
    
    container.appendChild(commands);
}