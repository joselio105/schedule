import createHtml from "./HtmlElement.js";
import setCommands from "./scheduleCommands.js";
import scheduleWeek from "./scheduleWeek.js";
import scheduleMonth from "./scheduleMonth.js";

export default () => {
    const container = document.querySelector('.content-page');
    setTitle(container);
    setCommands(container);
    setSchedule(container);
}

const setTitle = (container, type='Laboratório') => {
    const title = createHtml('h2', { text: `Agendamento do ${type}` });

    container.appendChild(title);
}

const setSchedule = (container, type='week') => {
    const scheduleTypes = {
        week: scheduleWeek,
        month: scheduleMonth
    }

    scheduleTypes[type](container);
}

