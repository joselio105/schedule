import createHtml, { createButton } from "../render/HtmlElement.js";
import { hours, weekDays, getWeekTitle, oneDay, getCompleteDate, getUtilWeekDays, getEventDuration, getWeekDay, getMonth  } from "../tools/Date.js";
import getEvents from "../api/events.js";
import { renderRoute } from "../routes/management.js";

const renderCalendar = (timeStamp=null) => {
    resetCalendarContainer(container);

    const calendar = createHtml('div', { class: "calendar-week" });
    setCalendarHead(container, calendar, timeStamp);
    setCalendarWeekDays(calendar, timeStamp);
    setCalendarContent(calendar, timeStamp);
    
    return calendar;
}

const setCalendarHead = (container, calendar, timeStamp) => {  
    const weekTitle = getWeekTitle(timeStamp);

    const head = createHtml('head', { class: "calendar-head"});
    const buttonBack = createButton(
        { 
            classes: ["button", "back"],
            value: timeStamp 
        },
        { 
            src: "./src/assets/images/icons/chevron-left.svg",
            alt: "voltar uma semana"
        }
    );
    const buttonFoward = createButton(
        { 
            classes: ["button", "foward"],
            value: timeStamp
        },
        { 
            src: "./src/assets/images/icons/chevron-right.svg",
            alt: "adiantar uma semana"
        }
    );

    const calendarInfoContainer = createHtml('div', { class: 'calendar-info' });
    const calendarTitle = createHtml('strong', {
        text: getMonth(timeStamp),
        class: 'calendar-title'
    });
    const calendarSubTitle = createHtml('p', {
        text: weekTitle,
        class: 'calendar-subtitle'
    });

    buttonBack.addEventListener('click', clickHandler);
    buttonFoward.addEventListener('click', clickHandler);

    calendarInfoContainer.appendChild(calendarTitle);
    calendarInfoContainer.appendChild(calendarSubTitle);
    head.appendChild(buttonBack);
    head.appendChild(calendarInfoContainer);
    head.appendChild(buttonFoward);
    calendar.appendChild(head);
}

const setCalendarWeekDays = (calendar, timeStamp) => {   
    const weekDaysWrapper = createHtml('div', { class: "week-days" });
    weekDaysWrapper.appendChild(createHtml('div', { class: 'day' }));
    getUtilWeekDays(timeStamp).forEach( day => {
        const weekDayTag = createHtml(
            'div',
            {
                text: weekDays[day.weekDay],
                class: "day"
            }
        );
        const monthDayAttributes = { 
            text: day.day < 10 ? `0${day.day}` : `${day.day}`, 
            dateTime: day.date
        };
        const monthDayTag = createHtml(
            'time', 
            monthDayAttributes
        );

        if(getWeekDay() === getCompleteDate(timeStamp, day.weekDay)){
            monthDayTag.classList.add('today');
        }

        if(day.currentMonth){
            weekDayTag.classList.add('current-month');
        }

        weekDayTag.appendChild(monthDayTag);
        weekDaysWrapper.appendChild(weekDayTag);
    })

    calendar.appendChild(weekDaysWrapper);
}

const setCalendarContent = (calendar, timeStamp) => {    
    const contentWrapper = createHtml('div', { class: "content-wrapper" });
    const hoursLabelWrapper = createHtml('div', { classes: ['label-content'] });
    hours.forEach( hour => {
        const label = createHtml('div', { 
            classes: ['hours-label', hour ],
            text: hour
         });

        hoursLabelWrapper.appendChild(label);
    })
    contentWrapper.appendChild(hoursLabelWrapper);
    
    getUtilWeekDays(timeStamp).forEach( day => {  
        const hoursWrapper = createHtml('div', { classes: ['day-content', day.date] });
        hours.forEach( hour => {
            const content = createHtml('button', { 
                classes: ['hours-content', hour ],
                title: "Clique para adicionar um novo agendamento",
                value: day.date
            });

             content.addEventListener('click', createClickHandler);
             hoursWrapper.appendChild(content);
        })
        
        renderEvents(hoursWrapper, day);        

        contentWrapper.appendChild(hoursWrapper);
    });

    calendar.appendChild(contentWrapper);
}

const resetCalendarContainer = container => {
    const children = [];
    for (const child of container.children) {
        children.push(child);
    }
    
    container.textContent = "";
    container.appendChild(children[0]);
    container.appendChild(children[1]);
}

const renderEvents = (container, day) => {
    getEvents(day.timeStamp).forEach( event => {
        const eventTag = createHtml(
            'button', {
                text: event.title,
                id: event.id,
                title: "Clique para visualizar este agendamento",
                classes: [
                    'schedule-event'
                ]
            }
        )
        const eventStart = getEventDuration( event.start) /10;
        const eventDuration = getEventDuration( event.stop, event.start) /10
        eventTag.style.top = `${eventStart}rem`;
        eventTag.style.height = `${eventDuration}rem`;

        eventTag.addEventListener('click', createClickHandler);

        container.appendChild(eventTag);
    })
}

const createClickHandler = event => {
    const value = event.currentTarget.value;
    const routeName = value.length > 0 ? 'scheduleForm' : 'scheduleView';

    renderRoute(routeName, {
        type: "week",
        value,
        id: event.currentTarget.id
    });
}

const clickHandler = event => {
    const buttonName = event.currentTarget.classList[1];
    const buttonValue = event.currentTarget.value === 'null'
        ? new Date().valueOf()
        : parseInt(event.currentTarget.value)
    ;
    const timeStamp = buttonName === "back" ? buttonValue -  oneDay * 7 : buttonValue +  oneDay * 7;
    
    renderRoute("schedule", {
        type: "week",
        timeStamp
    });
}

export default renderCalendar;