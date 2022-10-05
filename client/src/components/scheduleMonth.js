import createHtml, { createButton } from "../render/HtmlElement.js";
import { weekDays, getWeekTitle, oneDay, getStringDay, getCompleteDate, getWeekDay, getMonth, getMonthDays, getMonthInfo } from "../tools/Date.js";
import { renderRoute } from "../routes/management.js";
import { get } from "../api/server.js";
import { setLoading, unsetLoading } from "./Loading.js";

const renderCalendar = (timeStamp=null) => {
    resetCalendarContainer(container);

    const calendarContainer = createHtml('div', {class: "calendar-container"});
    const calendar = createHtml('div', { class: "calendar-week" });
    setCalendarHead(container, calendar, timeStamp);
    setCalendarWeekDays(calendar, timeStamp);
    setCalendarContent(calendar, timeStamp);
    
    calendarContainer.appendChild(calendar);
    return calendar;
}

const setCalendarHead = (container, calendar, timeStamp) => {  
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

    buttonBack.addEventListener('click', event => {clickHandler(container, event)});
    buttonFoward.addEventListener('click', event => {clickHandler(container, event)});

    calendarInfoContainer.appendChild(calendarTitle);
    head.appendChild(buttonBack);
    head.appendChild(calendarInfoContainer);
    head.appendChild(buttonFoward);
    calendar.appendChild(head);
}

const setCalendarWeekDays = (calendar, timeStamp) => {   
    const weekDaysWrapper = createHtml('div', { class: "month-days" });
    for(let day = 0; day < 7; day++){
        const weekDayTag = createHtml(
            'div',
            {
                text: weekDays[day],
                class: "day"
            }
        );
        const monthDayAttributes = { 
            text: getStringDay(timeStamp, day), 
            dateTime: getCompleteDate(timeStamp, day)
        };
        if(getWeekDay() === getCompleteDate(timeStamp, day)){
            monthDayAttributes.class = 'today';
        }
        weekDaysWrapper.appendChild(weekDayTag);
    }

    calendar.appendChild(weekDaysWrapper);
}

const setCalendarContent = async (calendar, timeStamp) => {    
    const contentWrapper = createHtml('div', { class: "content-month-wrapper" });
    
    const monthDays = getMonthDays(timeStamp); 
    const events = await get('schedules', {
        from: monthDays[0].apiDate,
        to: monthDays[monthDays.length - 1].apiDate
    });
    monthDays.forEach( date => {
        const day = createHtml('button', {
            class: 'day-content'
        });
        const time = createHtml('time', {
            text: date.day,
            dateTime: date.date
        })

        if(date.currentMonth){
            day.classList.add('current-month');
        }
        
        if(date.date === getWeekDay()){
            time.classList.add('today');
        }

        day.appendChild(time);
        
        renderEvents(day, date, events);
        contentWrapper.appendChild(day)
    })

    calendar.appendChild(contentWrapper);
}

const renderEvents = async (container, day, events) => {
    setLoading();
    events.forEach( event => {
        if(day.apiDate === event.day){
            const eventTag = createHtml(
                'button', {
                    text: event.title,
                    id: event.id,
                    classes: [
                        'schedule-event'
                    ]
                }
            );

            eventTag.addEventListener('click', createClickHandler);

            container.appendChild(eventTag);
        }
    })
    unsetLoading();
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

const createClickHandler = event => {
    const value = event.currentTarget.value;
    const routeName = value.length > 0 ? 'scheduleForm' : 'scheduleView';

    renderRoute(routeName, {
        type: "month",
        value,
        id: event.currentTarget.id
    });
}

const clickHandler = (container, event) => {
    const buttonName = event.currentTarget.classList[1];
    const buttonValue = event.currentTarget.value === 'null'
        ? new Date().valueOf()
        : parseInt(event.currentTarget.value)
    ;
    const monthInfo = getMonthInfo(buttonValue);
    const timeStamp = buttonName === "back" ? monthInfo.firstDay -  oneDay : monthInfo.lastDay +  oneDay;
    
    renderRoute("schedule", {
        type: "month",
        timeStamp
    });
}

export default renderCalendar;