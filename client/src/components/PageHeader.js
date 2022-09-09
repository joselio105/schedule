import createElement from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

export default (title, createTaget) => {
    const pageHeader = createElement('header', {class: 'page-header'});
    const titleTag = createElement('h2', {text: title});
    const buttonLabel = (title.substr(-2, 2)==='es' ? title.substr(0, title.length-2) : title.substr(0, title.length-1));
    
    const buttonCreate = createElement('button', {
        classes: ['create'],
        href: createTaget,
        text: `Novo ${buttonLabel}`
    });

    buttonCreate.addEventListener('click', event => {
        event.preventDefault();
        renderRoute(createTaget);
    });

    pageHeader.appendChild(titleTag);
    pageHeader.appendChild(buttonCreate);

    return pageHeader;
}