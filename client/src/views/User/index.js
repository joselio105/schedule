import createElement from "../../render/HtmlElement.js";
import { get } from "../../api/server.js";
import createCard from "../../components/userCard.js";
import createCommands from "../../components/pageCommands.js";
import createPagination from "../../components/Pagination.js";
import filters, { fromName, pageName } from "../../filters/users";

export default async attributes => {
    document.title = "ARQ/UFSC | Servidores";

    attributes.page = (attributes.hasOwnProperty('page') ?  attributes.page : 1);
    const params = {
        paginate: true,
        pageLimit: 12,
        page: attributes.page,
        order: "nome",
    }
    if(attributes.hasOwnProperty('tipo') && attributes.tipo !='null'){
        params.tipo = attributes.tipo;
    }
    if(attributes.hasOwnProperty('saida') && attributes.saida !='null'){
        params.saida = attributes.saida;
    }
    if(attributes.hasOwnProperty('lattes') && attributes.lattes !='null'){
        params.lattes = attributes.lattes;
    }
    if(attributes.hasOwnProperty('site') && attributes.site !='null'){
        params.site = attributes.site;
    }
    if(params.hasOwnProperty('tipo') && params.tipo === 'null'){
        delete params.tipo;
    }

    if(params.hasOwnProperty('saida') && params.saida === 'null'){
        delete params.saida;
    }
    if(params.hasOwnProperty('lattes') && params.lattes === 'null'){
        delete params.lattes;
    }
    if(params.hasOwnProperty('site') && params.site === 'null'){
        delete params.site;
    }
    
    attributes.filters = filters;
    attributes.pageName = pageName;
    attributes.formName =  fromName;
    
    const users = await get(`users`, params);
    
    const { totalPages, nextPage, previousPage } = users;
    
    return [
        createHeader(attributes),
        createList(users),
        createPagination({ 
            page: attributes.page, 
            totalPages, 
            previousPage, 
            nextPage, 
            routeName:'users' ,
            ... attributes
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

