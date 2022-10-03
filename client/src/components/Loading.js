import createElement from "../render/HtmlElement.js";

const body = document.children[0].childNodes[2];

const container = createElement('div', { classes: ['loading-container', 'active']});

export const setLoading = () => {
    renderLoading();
    body.appendChild(container);
}

export const unsetLoading = () => {
    body.removeChild(container);
}

const renderLoading = () => {
    container.textContent = '';
    const ballWrapper = createElement('div', { classes: ['loading-balls-Wrapper']});
    const balls = [
        createElement('div', { classes: ["loading-ball", "one"]}),
        createElement('div', { classes: ["loading-ball", "two"]}),
        createElement('div', { classes: ["loading-ball", "three"]}),
    ];
    
    balls.forEach(ball => ballWrapper.appendChild(ball));
    container.appendChild(ballWrapper);
}