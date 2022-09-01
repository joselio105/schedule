import creteElement from "../lib/HtmlElement.js";
const time = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

export default () => {
    const counter = creteElement('div', {
        class: 'counter', 
        text: "00:00:00",
        style: `
            position: absolute;
            left: 50%;
            color: #0F0;
            font-size: 25px;
            background-color: #000;
            padding: 5px;
            border-radius: 5px;

        `
    });
    const clock = () => {        

        time.seconds++;
        if(time.seconds >59){
            time.seconds = 0;
            time.minutes++;
        }
        if(time.minutes > 59){
            time.minutes = 0;
            time.hours++;
        }

        time.seconds = ((time.seconds < 10) && (time.seconds.length!=2) ? `0${time.seconds}` : time.seconds);
        time.minutes = ((time.minutes < 10) && (time.minutes.length!=2) ? `0${time.minutes}` : time.minutes);
        time.hours = ((time.hours < 10) && (time.hours.length!=2) ? `0${time.hours}` : time.hours);

        counter.textContent = `${time.hours}:${time.minutes}:${time.seconds}`;
    }
    const headerInner = document.querySelector('header .inner');
    headerInner.appendChild(counter);
    setInterval(() => {
        clock();
    }, 1000);
}