import createHtml, { createButton } from "./HtmlElement.js";
import { hours, weekDays, getWeekTitle, oneDay, getStringDay, getCompleteDate, getUtilWeekDays, getEventDuration, getWeekDay, getMonth  } from "../tools/Date.js";

const events = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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

const renderCalendar = (container, timeStamp=null) => {
    resetCalendarContainer(container);

    const calendar = createHtml('div', { class: "calendar-week" });
    setCalendarHead(container, calendar, timeStamp);
    setCalendarWeekDays(calendar, timeStamp);
    setCalendarContent(calendar, timeStamp);
    
    container.appendChild(calendar);
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

    buttonBack.addEventListener('click', event => {clickHandler(container, event)});
    buttonFoward.addEventListener('click', event => {clickHandler(container, event)});

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
    for(let day = 1; day < 6; day++){
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
        const monthDayTag = createHtml(
            'time', 
            monthDayAttributes
        );
        weekDayTag.appendChild(monthDayTag);
        weekDaysWrapper.appendChild(weekDayTag);
    }

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
        renderEvents(hoursWrapper, day.date);        

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

const renderEvents = (container, date) => {
    events.forEach( event => {
        if(date === event.day){
            const eventTag = createHtml(
                'button', {
                    text: event.title,
                    id: event.id,
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
        
        }
    })
}

const createClickHandler = event => {
    const buttonValue = event.currentTarget.value;
    const buttonId = event.currentTarget.id;
    const valueString = buttonValue.split('/');

    console.log(
        buttonValue,
        buttonId
        )
}

const clickHandler = (container, event) => {
    const buttonName = event.currentTarget.classList[1];
    const buttonValue = event.currentTarget.value === 'null'
        ? new Date().valueOf()
        : parseInt(event.currentTarget.value)
    ;
    
    const actions = {
        back: timeStamp => {
            const newDate = timeStamp -  oneDay * 7;
            renderCalendar(container, newDate); 
        },
        foward: timeStamp => {
            const newDate = timeStamp +  oneDay * 7;
            renderCalendar(container, newDate); 
        }
    }
    
    actions[buttonName](buttonValue);
}

export default renderCalendar;