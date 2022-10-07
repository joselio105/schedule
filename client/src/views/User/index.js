import createElement from "../../render/HtmlElement.js";
import { get } from "../../api/server.js";
import createCard from "../../components/userCard.js";
import createCommands from "../../components/userCommands.js";
import createPagination from "../../components/Pagination.js";

export default async attributes => {
    document.title = "ARQ/UFSC | Servidores";

    const page = (attributes.page ?  attributes.page : 1);
    const params = {
        order: "nome",
        paginate: true,
        pageLimit: 12,
        page
    }
    if(attributes.hasOwnProperty('tipo') && attributes.tipo !='null'){
        params.tipo = attributes.tipo;
    }
    console.log(params)
    const users = await get(`users`, params);
    
    const { totalPages, nextPage, previousPage } = users;
    
    return [
        createHeader(attributes),
        createList(users),
        createPagination({ 
            page, 
            totalPages, 
            previousPage, 
            nextPage, 
            routeName:'users' 
        })
    ];
}

const createHeader = attributes => {
    const pageHeader = createElement('header');
    const titleTag = createElement('h2', {text: 'Servidores'});

    pageHeader.appendChild(titleTag);
    pageHeader.appendChild(createCommands(attributes));
    
    return pageHeader;
}

const createList = users => {
    const container = createElement('div', {
        class: 'card-wrapper'
    });
    
    users.pageContent.forEach(user => {
        const card = createCard(user);
    
        container.appendChild(card);
    });

    return container;
}

