import creteElement from "../render/HtmlElement.js";
import { defaultView, renderRoute } from "../routes/management.js";

export default attributes => {
    return [
        creteElement('h2', {text: 'Página não encontrada'}),
        setButton()
    ];
}

const setButton = () => {
    const button = creteElement('button', {
        text: "Voltar",

    });

    button.addEventListener('click', () => {
        renderRoute(defaultView);
    });

    return button;
}