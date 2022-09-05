import createHtml, { createButton } from "./HtmlElement.js";
import { hours, weekDays, getWeekTitle, oneDay, getStringDay, getUtilWeekDays, getEventDuration  } from "../tools/Date.js";

const events = [
    {
        day: "07/09/2022",
        start: "10:40",
        stop: "15:30",
        title: "Indepedência",
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        day: "12/10/2022",
        start: "07:30",
        stop: "11:50",
        title: "Criança",
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        day: "02/11/2022",
        start: "13:30",
        stop: "17:10",
        title: "Finados",
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        day: "15/11/2022",
        start: "07:30",
        stop: "11:50",
        title: "República",
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    },
    {
        day: "25/12/2022",
        start: "13:30",
        stop: "17:10",
        title: "Natal",
        user: {
            name: "Fulano de Tal",
            email: "fulano@detal.com"
        }
    }
];

const renderCalendar = (container, dateValue=null) => {
    const date = dateValue === null ? new Date().valueOf() : dateValue;

    const calendar = createHtml('div', { class: "calendar-week" });
    setCalendarHead(container, calendar, date);
    setCalendarBody(calendar, date);
    
    container.appendChild(calendar);
}

const setCalendarHead = (container, calendar, date) => {  
    const weekTitle = getWeekTitle(date);

    const head = createHtml('head', { class: "calendar-head"});
    const buttonBack = createButton(
        { 
            classes: ["button", "back"],
            value: date 
        },
        { 
            src: "./src/assets/images/icons/chevron-left.svg",
            alt: "voltar uma semana"
        }
    );
    const buttonFoward = createButton(
        { 
            classes: ["button", "foward"],
            value: date
        },
        { 
            src: "./src/assets/images/icons/chevron-right.svg",
            alt: "adiantar uma semana"
        }
    );
    const calendarTitle = createHtml('strong', {
        text: weekTitle,
        class: 'calendar-title'
    });

    buttonBack.addEventListener('click', event => {clickHandler(container, event)});
    buttonFoward.addEventListener('click', event => {clickHandler(container, event)});

    head.appendChild(buttonBack);
    head.appendChild(calendarTitle);
    head.appendChild(buttonFoward);
    calendar.appendChild(head);
}

const setCalendarBody = (calendar, date) => {
    setCalendarWeekDays(calendar, date);
    setCalendarContent(calendar, date);
}

const setCalendarWeekDays = (calendar, date) => {   
    const weekDaysWrapper = createHtml('div', { class: "week-days" });
    weekDaysWrapper.appendChild(createHtml('div', { class: 'day' }));
    for(let day = 1; day < 6; day++){
        weekDaysWrapper.appendChild(createHtml(
                'div',
                {
                    text: `${weekDays[day]} - ${getStringDay(date, day)}`,
                    class: "day"
                }
            )
        );
    }

    calendar.appendChild(weekDaysWrapper);
}

const setCalendarContent = (calendar, date) => {    
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
    
    getUtilWeekDays(date).forEach( day => {        
        const hoursWrapper = createHtml('div', { classes: ['day-content', day.date] });
        hours.forEach( hour => {
            const label = createHtml('div', { 
                classes: ['hours-content', hour ]
             });
             
             hoursWrapper.appendChild(label);
        })
        renderEvents(hoursWrapper, day.date);        

        contentWrapper.appendChild(hoursWrapper);
    });

    calendar.appendChild(contentWrapper);
}

const resetCalendarContainer = container => {
    const children = container.children.map(child => child);
    container.textContent = "";
    container.appendChild(children[0]);
    container.appendChild(children[1]);
}

const renderEvents = (container, date) => {
    events.forEach( event => {
        if(date === event.day){
            const eventTag = createHtml(
                'div', {
                    text: event.title,
                    classes: [
                        'schedule-event'
                    ]
                }
            )
            const eventStart = getEventDuration( event.start) /10;
            const eventDuration = getEventDuration( event.stop, event.start) /10
            eventTag.style.top = `${eventStart}rem`;
            eventTag.style.height = `${eventDuration}rem`;

            container.appendChild(eventTag);
        
        }
    })
}

const clickHandler = (container, event) => {
    const buttonName = event.currentTarget.classList[1];
    const buttonValue = parseInt(event.currentTarget.value);
    
    const actions = {
        back: date => {
            const newDate = date -  oneDay * 7;
            renderCalendar(container, newDate); 
        },
        foward: date => {
            const newDate = date +  oneDay * 7;
            renderCalendar(container, newDate); 
        }
    }

    actions[buttonName](buttonValue);
}

export default renderCalendar;