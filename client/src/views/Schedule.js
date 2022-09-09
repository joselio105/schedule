import createHtml from "../render/HtmlElement.js";
import setCommands from "../render/scheduleCommands.js";
import scheduleWeek from "../render/scheduleWeek.js";
import scheduleMonth from "../render/scheduleMonth.js";

export default attributes => {
    const calendarType = attributes.hasOwnProperty('type') ? attributes.type : 'week';

    return [
        setTitle(),
        setCommands(calendarType),
        setCalendar(calendarType, attributes.timeStamp)
    ];
}

const setTitle = (type='Laboratório') => {
    return createHtml('h2', { text: `Agendamento do ${type}` });
}

const setCalendar = (type='month', timeStamp=null) => {
    const renderCalendar = {
        week: scheduleWeek,
        month: scheduleMonth
    }
    
    return renderCalendar[type](timeStamp);
}

