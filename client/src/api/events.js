import { get } from "./server.js";
import { getMonthDays } from "../tools/Date";

export default async date => {
    const events = await getMonthEvents(date);
    
    const result = events.filter( 
        event => event.day === date
    );
    
    return result;
}

export const getEvent = async eventId => {
    const event = await get('schedules', { id: eventId});
    return event;
}

export const getMonthEvents = async date => {
    const timeStamp = new Date(date).valueOf();
    const monthDays = getMonthDays(timeStamp);
    
    const events = await get('schedules', {
        from: monthDays[0].apiDate,
        to: monthDays[monthDays.length - 1].apiDate
    });

    return events;
}