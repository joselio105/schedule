import createElement from "../render/HtmlElement.js";

export default (text = 'Enviar') => {
    const button = createElement('button', { classes: ["submit", "button"] });
    const span = createElement('span', { text, classes: ["text"] });
    const icon = createElement('img', { classes: ["icon"], src: "./src/assets/images/icons/check_green.svg" });

    button.appendChild(span);
    button.appendChild(icon);

    return button;
}