import { getMonthInfo, getStringDay, getUtilWeekDays, oneDay, oneWeek } from "../tools/Date.js";

const events = [
    {
        id: 1,
        day: "2022/09/07",
        start: "09:20",
        stop: "11:00",
        title: "Aula 2",
        repeat: {
            type: "week",
            times: 0
        },
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 3,
        day: "2022/09/06",
        start: "07:30",
        stop: "09:10",
        title: "Aula 1",
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
        day: "2022/09/05",
        start: "11:30",
        stop: "14:20",
        title: "Curso",
        description: "",
        repeat: {
            type: "day",
            times: 4
        },
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    }
];

export default timeStamp => {
    const eventsRepeated = repeatEvents();
    
    return events.concat(eventsRepeated).filter( 
        event => getTimeStamp(event.day) === timeStamp
    );
}

export const getEvent = eventId => {
    return events.find(event => event.id === eventId);
}

const repeatEvents = () => {
    const response = [];

    events.forEach( event => {
        let iterator = 1;
        while(iterator < event.repeat.times){
            response.push(doRepeat[event.repeat.type](event, iterator));

            iterator++;
        }
    })

    return response;
}

const doRepeat = {
    day: (event, iterator) => {
        const timeStamp = getTimeStamp(event.day);
        const dateObject = new Date(timeStamp + iterator * oneDay);
        const daYString = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : `${dateObject.getDate()}`;
        const monthString = dateObject.getMonth() < 10 ? `0${dateObject.getMonth()}` : `${dateObject.getMonth()}`;

        return {
            id: event.id,
            day: `${dateObject.getFullYear()}/${monthString}/${daYString}`,
            start: event.start,
            stop: event.stop,
            title: event.title,
            description: event.description,
            repeat: {
                type: event.repeat.type,
                times: event.repeat.times - 1
            },
            user: event.user
        };
    },
    week: (event, iterator) => {
        const timeStamp = getTimeStamp(event.day);
        const dateObject = new Date(timeStamp + iterator * oneWeek);
        const daYString = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : `${dateObject.getDate()}`;
        const monthString = dateObject.getMonth() < 10 ? `0${dateObject.getMonth()}` : `${dateObject.getMonth()}`;
        
        return {
            id: event.id,
            day: `${dateObject.getFullYear()}/${monthString}/${daYString}`,
            start: event.start,
            stop: event.stop,
            title: event.title,
            description: event.description,
            repeat: {
                type: event.repeat.type,
                times: event.repeat.times - 1
            },
            user: event.user
        };
    }
}

const getTimeStamp = date => {
    const dateObject = new Date(date);
    
    return dateObject.valueOf();
}