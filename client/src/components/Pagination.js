import createElement from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

export default pageInfo => {
    const { page, totalPages, previousPage, nextPage, routeName } = pageInfo;

    const pagination = createElement('section', {class: 'pagination'});
    
    const controllLeft = createElement('button', {classes: ['command', 'previous']});
    const imageLeft = createElement('img', {
        src: './src/assets/images/icons/arrow-left-circle.svg',
        alt: 'página anterior'
    });
    controllLeft.addEventListener('click', event => {
        renderRoute(routeName, { page: previousPage });
    });
    controllLeft.appendChild(imageLeft);
    
    const controllRight = createElement('button', {classes: ['command', 'next']});
    const imageRight = createElement('img', {
        src: './src/assets/images/icons/arrow-right-circle.svg',
        alt: 'página seguinte'
    });
    controllRight.addEventListener('click', event => {
        renderRoute(routeName, { page: nextPage });
    });
    controllRight.appendChild(imageRight);

    const status = setPage(page, totalPages);
    
    pagination.appendChild(controllLeft);
    pagination.appendChild(status);
    pagination.appendChild(controllRight);

    return pagination;
}

export const setPage = (page, totalPages) => {
    return createElement('span', {
        text: `Página ${page} de ${totalPages}`
    });
}