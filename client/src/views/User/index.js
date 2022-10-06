import createElement from "../../render/HtmlElement.js";
import { get } from "../../api/server.js";
import createCard from "../../components/userCard.js";
import createPagination from "../../components/Pagination.js";
import createPageHeader from "../../components/PageHeader.js";

export default async attributes => {
    document.title = "ARQ/UFSC | Servidores";

    const page = (attributes.page ?  attributes.page : 1);
    const users = await get(`users&order=nome&paginate&pageLimit=20&page=${page}`);
    
    const { totalPages, nextPage, previousPage } = users;

    const elements = {
        header: createPageHeader('Servidores', 'userForm'),
        list: createList(users),
        pagination: createPagination({ 
            page, 
            totalPages, 
            previousPage, 
            nextPage, 
            routeName:'users' 
        })
    };
    
    return Object.values(elements);
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

