export const oneDay = 1000 * 60 * 60 * 24;
export const oneWeek = oneDay * 7;

export const getWeekTitle = timeStamp => {   
    const dateObject = timeStamp === null ? new Date() : new Date(timeStamp);
    const today = dateObject.valueOf();
    const weekDay = dateObject.getDay();
    
    const sunday = today - oneDay * weekDay;
    const saturday = today + oneDay * (6 - weekDay);
    
    return `
        ${new Date(sunday).toLocaleDateString()} - 
        ${new Date(saturday).toLocaleDateString()}
    `;
}

export const getMonth = timeStamp => {
    const dateObject = timeStamp === null ? new Date() : new Date(timeStamp);

    return `${months[dateObject.getMonth()]}/${dateObject.getFullYear()}`;
}

export const getWeekTimestamps = timeStamp => {
    const response = [];
    const dateObject = timeStamp === null ? new Date() : new Date(timeStamp);

    const today = dateObject.valueOf();
    const weekDay = dateObject.getDay();

    for(let day=0; day<7; day++){
        const timeStampDay = today - ( oneDay * weekDay) + ( day * oneDay);
        response.push(timeStampDay);
    }

    return response;
}

export const getMonthInfo = timeStampToday => {
    const monthDays = getMonthDaysClean(timeStampToday);
    
    return {
        firstDay: monthDays[0].timestamp,
        lastDay: monthDays[monthDays.length-1].timestamp,
    }
}

const getMonthDaysClean = timeStampToday => {
    const dateObject = timeStampToday === null ? new Date() : new Date(timeStampToday);  
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();
    const days = [];

    const newDateObject = new Date(`${month+1}-1-${year}`);
    const timeStamp = newDateObject.valueOf();
    const data = {
        day: 1,
        timeStamp
    };

    while(new Date(data.timeStamp).getMonth() === month){
        const date = new Date(data.timeStamp);
        days.push({
            day: data.day,
            weekDay: date.getDay(),
            timestamp: data.timeStamp, 
            date: date.toDateString(),
            currentMonth: true,
            apiDate: `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        });
        data.timeStamp += oneDay;

        data.day++;
    };

    return days;
}

export const getMonthDays = timeStampToday => {
    const dateObject = timeStampToday === null ? new Date() : new Date(timeStampToday);  
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth()+1;
    const days = [];

    const newDateObject = new Date(`${year}/${month}/1`);
    const timeStamp = newDateObject.valueOf();
    const weekDay = newDateObject.getDay();

    for( let day=weekDay; day>0; day--){
        const lastMonthTimeStamp = timeStamp - (day * oneDay);
        const date = new Date(lastMonthTimeStamp);
        days.push({
            day: date.getDate(),
            weekDay: date.getDay(),
            timestamp: lastMonthTimeStamp, 
            date: date.toDateString(),
            apiDate: `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        });
    }

    getMonthDaysClean(timeStampToday).forEach(day => days.push(day));
    
    const lastDay = days[days.length - 1];
    for( let day=lastDay.weekDay; day<6; day++){
        const nextMonthTimeStamp = lastDay.timestamp + (5 - day) * oneDay;
        const date = new Date(nextMonthTimeStamp);
        days.push({
            day: date.getDate(),
            weekDay: date.getDay(),
            timestamp: nextMonthTimeStamp, 
            date: date.toDateString(),
            apiDate: `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        });
    }
    const newLastDay = days[days.length - 1];

    return days;
}

export const getStringDay = (timeStamp, weekDayValue) => {  
    const dateObject = timeStamp === null ? new Date() : new Date(timeStamp);  
    const weekDay = dateObject.getDay();
    const day = dateObject.getDate();
    const today = day + (weekDayValue - weekDay);
    return today < 10 ? `0${today}` : `${today}`;
}

export const getWeekDay = () => {
    const timeStampDay = new Date().valueOf();
    const weekTimeStamps = getWeekTimestamps(timeStampDay);
    
    const weekDay = weekTimeStamps.indexOf(timeStampDay);
    return new Date(weekTimeStamps[weekDay]).toDateString();
}

export const getMonthDay = () => {
    const timeStampDay = new Date().valueOf();
    const weekTimeStamps = getWeekTimestamps(timeStampDay);
    
    const weekDay = weekTimeStamps.indexOf(timeStampDay);
    return new Date(weekTimeStamps[weekDay]).getDate();
}

export const getCompleteDate = (timeStamp, day) => {
    const weekTimeStamps = getWeekTimestamps(timeStamp);

    return new Date(weekTimeStamps[day]).toDateString();
}

export const getEventDuration = (stop, start='420') => {

    return stop - start;
}

export const getUtilWeekDays = timeStamp => {
    const dateObject = timeStamp === null ? new Date() : new Date(timeStamp);
    const response = [];
    
    const dateString = `${dateObject.getMonth()+1}-${dateObject.getDate()}-${dateObject.getFullYear()}`;
    const today = new Date(dateString).valueOf();
    
    const weekDayToday = dateObject.getDay();

    for(let weekDay = 1; weekDay < 6; weekDay++){
        const timeStamp = today + oneDay * (weekDay - weekDayToday);
        const dateObjectCurrent = new Date(timeStamp);
        
        const daYString = String(dateObjectCurrent.getDate()).padStart(2, '0');
        const monthString = String(dateObjectCurrent.getMonth()+1).padStart(2, '0');
        
        const day = {
            date: `${dateObjectCurrent.getFullYear()}-${monthString}-${daYString}`,
            day: dateObjectCurrent.getDate(),
            weekDay,
            timeStamp: dateObjectCurrent.valueOf(),
            currentMonth: (dateObjectCurrent.getMonth() === dateObject.getMonth())
        };

        response.push(day);
    }
    
    return response;
}

export const intToHoursString = value => {
    const hours = Math.floor(value /60);
    const minutes = value % 60;

    return `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}`;
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
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];