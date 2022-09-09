import createElement from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

export default (objectName, objectValue) => {
    const nav = createElement('nav', {class: 'element-header-nav'});

    const buttons = [
        createElement('button', {
            classes: ['command', 'update'],
            id: objectValue.id
        }),
        createElement('button', {
            classes: ['command', 'delete'],
            id: objectValue.id
        })
    ];

    buttons[0].addEventListener('click', event => {
        renderRoute(`${objectName}Form`, { id: event.currentTarget.id });
    });

    buttons[1].addEventListener('click', event => {
        renderRoute('deleteForm', {
            controller: objectName,
            id: event.currentTarget.id
        });
    });

    const images = [
        createElement('img', {
            src: './src/assets/images/icons/edit.svg',
            alt: 'Editar Usuário'
        }),
        createElement('img', {
            src: './src/assets/images/icons/trash-2.svg',
            alt: 'Excluir Usuário'
        })
    ];
    
    buttons.forEach((button, key) => button.appendChild(images[key]));
    buttons.forEach(button => nav.appendChild(button));
    return nav;
}