export const oneDay = 1000 * 60 * 60 * 24;

export const getWeekTitle = date => {
    const dateObject = new Date(date);
    
    const today = dateObject.valueOf();
    const weekDay = dateObject.getDay();
    
    const sunday = today - oneDay * weekDay;
    const saturday = today + oneDay * (6 - weekDay);
    
    return `
        ${new Date(sunday).toLocaleDateString()} - 
        ${new Date(saturday).toLocaleDateString()}
    `;
}

export const getStringDay = (date, weekDayValue) => {
    const dateObject = new Date(date);
    
    const weekDay = dateObject.getDay();
    const day = dateObject.getDate();
    const today = day + (weekDayValue - weekDay);
    return today < 10 ? `0${today}` : today;
}

export const getEventDuration = (stop, start='07:00') => {
    const startMinutes = convertToMinutes(start);
    const stopMinutes = convertToMinutes(stop);

    return stopMinutes - startMinutes;
}

const convertToMinutes = time => {
    const timeArray = time.split(':');
    return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
}

const convertToTime = minutesValue => {
    const minutes = minutesValue % 60;
    const hours = (minutesValue - minutes) / 60;

    return `${hours}:${minutes}`;
}

export const getUtilWeekDays = date => {
    const response = [];
    const dateObject = new Date(date);
    
    const today = dateObject.valueOf();
    const weekDayToday = dateObject.getDay();

    for(let weekDay = 1; weekDay < 6; weekDay++){
        const timeStamp = today + oneDay * (weekDay - weekDayToday);
        const day = {
            date: new Date(timeStamp).toLocaleDateString(),
            weekDay
        };

        response.push(day);
    }
    
    return response;
}

export const hours = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00'
];

export const weekDays = [
    '',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
];