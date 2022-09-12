import { getMonthInfo, getStringDay, getUtilWeekDays, oneDay, oneWeek } from "../tools/Date.js";

const events = [
    {
        id: 1,
        parentId: null,
        day: "2022/09/12",
        start: "09:20",
        stop: "11:50",
        title: "Aula 1",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 2,
        parentId: 1,
        day: "2022/09/13",
        start: "09:20",
        stop: "11:50",
        title: "Aula 1",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 3,
        parentId: 1,
        day: "2022/09/14",
        start: "09:20",
        stop: "11:50",
        title: "Aula 1",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 4,
        parentId: 1,
        day: "2022/09/15",
        start: "09:20",
        stop: "11:50",
        title: "Aula 1",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 5,
        parentId: 1,
        day: "2022/09/16",
        start: "09:20",
        stop: "11:50",
        title: "Aula 1",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 6,
        parentId: null,
        day: "2022/09/13",
        start: "12:00",
        stop: "15:50",
        title: "Aula 2",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
    {
        id: 7,
        parentId: 6,
        day: "2022/09/15",
        start: "12:00",
        stop: "15:50",
        title: "Aula 2",
        user: {
            name: "Fulano de Tal",
            description: "",
            email: "fulano@detal.com"
        }
    },
];

export default timeStamp => {
    return events.filter( 
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