import createHtml, { createButton } from "./HtmlElement.js";

const hours = [
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

const weekDays = [
    '',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
];

export default container => {
    const calendar = createHtml('div', { class: "calendar-week" });
    setCalendarHead(calendar);
    setCalendarBody(calendar);

    console.log(calendar)
    container.appendChild(calendar);
}

const setCalendarHead = calendar => {
    //Não esqueça os anos bisextos
    const months = {
        1: 31,
        2: 28,
        3: 31,
        4: 40,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
    }
    const date = new Date();
    const monthDay = date.getDate();
    const weekDay = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const sunday = monthDay - weekDay > 0
        ? monthDay - weekDay
        : months[month] + monthDay - weekDay;

    const saturday = monthDay + ( 6 - weekDay) < months[month + 1]
        ? monthDay + ( 6 - weekDay)
        : months[month + 1] + monthDay;// + ( 6 - weekDay)

    const weekTitle = `${sunday}/${month}/${year} - ${saturday}/${month + 1}/${year}`;

    const head = createHtml('head', { class: "calendar-head"});
    const buttonBack = createButton(
        { classes: ["button", "back"] },
        { 
            src: "./src/assets/images/icons/chevron-left.svg",
            alt: "voltar uma semana"
        }
    );
    const buttonFoward = createButton(
        { classes: ["button", "foward"] },
        { 
            src: "./src/assets/images/icons/chevron-right.svg",
            alt: "adiantar uma semana"
        }
    );
    const calendarTitle = createHtml('strong', {
        text: weekTitle,
        class: 'calendar-title'
    });

    head.appendChild(buttonBack);
    head.appendChild(calendarTitle);
    head.appendChild(buttonFoward);
    calendar.appendChild(head);
}

const setCalendarBody = calendar => {
    setCalendarWeekDays(calendar);
    setCalendarContent(calendar);
}

const setCalendarWeekDays = calendar => {    
    const weekDaysWrapper = createHtml('div', { class: "week-days" });
    weekDays.forEach(day => 
        weekDaysWrapper.appendChild(createHtml(
            'div', 
            { 
                text: day, 
                class: "day"
            }
        ))
    );

    calendar.appendChild(weekDaysWrapper);
}

const setCalendarContent = calendar => {    

    const contentWrapper = createHtml('div', { class: "content-wrapper" });
    hours.forEach( hour => {
        weekDays.forEach( (day, daykey) => {
            const attributes = daykey === 0 
                ? {
                    text: hour,
                    class: "hour-label"
                } 
                : { class: "hour-content" }
            ;
            contentWrapper.appendChild(
                createHtml('div', attributes)
            )
        })
    })

    calendar.appendChild(contentWrapper);
}