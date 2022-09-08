import { getMonthInfo, getUtilWeekDays, oneDay, oneWeek } from "../tools/Date.js";

const events = [
    {
        id: 1,
        day: "07/09/2022",
        start: "13:30",
        stop: "15:20",
        title: "Indepedência",
        description: "",
        repeat: {
            type: "",
            times: 0
        },
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        id: 20,
        day: "09/09/2022",
        start: "07:30",
        stop: "09:10",
        title: "Aula",
        repeat: {
            type: "week",
            times: 5
        },
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 2,
        day: "05/09/2022",
        start: "09:10",
        stop: "11:50",
        title: "Curso",
        description: "",
        repeat: {
            type: "day",
            times: 3
        },
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        id: 3,
        day: "02/11/2022",
        start: "13:30",
        stop: "17:10",
        title: "Finados",
        description: "",
        repeat: {
            type: "",
            times: 0
        },
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        id: 4,
        day: "15/11/2022",
        start: "07:30",
        stop: "11:50",
        title: "República",
        description: "",
        repeat: {
            type: "",
            times: 0
        },
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        id: 5,
        day: "25/12/2022",
        start: "13:30",
        stop: "17:10",
        title: "Natal",
        description: "",
        repeat: {
            type: "",
            times: 0
        },
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    }
];

export default (timeStamp, calendarType='week') => {
    const days = getUtilWeekDays(timeStamp)
    const lastDayKey = days.length - 1;

    // repeatEvents();
    console.log(events)
    
    return events.filter(event => {
        event.timeStamp = getTimeStamp(event.day);
        const weekTimeStamps = {
            start: getTimeStamp(days[0].date),
            stop: getTimeStamp(days[lastDayKey].date)
        };
        const beforeWeekStarts = event.timeStamp >= weekTimeStamps.start;
        const afterWeekStops = event.timeStamp <= weekTimeStamps.stop;

        return beforeWeekStarts && afterWeekStops;
    })
}

const repeatEvents = () => {
    events.forEach( (event, eventKey) => {
        while(event.repeat.times > 1){
            doRepeat[event.repeat.type](event, eventKey);
        }
    })
}

const doRepeat = {
    day: (event, eventKey) => {
        const timeStamp = getTimeStamp(event.day);
        event.day = new Date(timeStamp + oneDay).toLocaleDateString();
        event.repeat.times--;
        events[eventKey].repeat.times--;

        events.push(event);
    },
    week: (event, eventKey) => {
        const timeStamp = getTimeStamp(event.day);
        event.day = new Date(timeStamp + oneWeek).toLocaleDateString();
        event.repeat.times--;
        events[eventKey].repeat.times--;

        events.push(event);},
    /* month: event => {
        const timeStamp = getTimeStamp(event.day);
        event.day = new Date(timeStamp + getOneMonth(timeStamp)).toLocaleDateString();
        event.repeat.times--;

        events.push(event);}, */
}

const getOneMonth = timeStamp => {
    const monthInfo = getMonthInfo(timeStamp);

    return monthInfo.lastDay * oneDay;
}

const getTimeStamp = date => {
    const dateArray = date.split('/');
    const dateObject = new Date(`${dateArray[1]}-${dateArray[0]}-${dateArray[2]}`);
    
    return dateObject.valueOf();
}