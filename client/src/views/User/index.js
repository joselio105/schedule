import createElement from "../../render/HtmlElement.js";
import { get } from "../../api/server.js";
import createPagination from "../../components/Pagination.js";
import createPageHeader from "../../components/PageHeader.js";
import createButtonsWrapper from "../../components/ButtonsWrapper.js";
import createCardFooter from "../../components/ElementFooter.js";

export default async attributes => {

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

const createCard = user => {
    const card = createElement('section', {
        classes: [ 'card', user.tipo ]
    });

    getCardHeader(card, user);
    getCardBody(card, user);
    card.appendChild(createCardFooter('card-footer', user));

    return card;
}

const getCardHeader = (card, user) => {
    const header = createElement('header', {
        class: 'card-header'
    });

    const title = createElement('strong', {
        class: 'card-title',
        text: user.nome
    });

    const nav = createButtonsWrapper('user', user);

    header.appendChild(title);
    header.appendChild(nav);
    card.appendChild(header);
}

const getCardBody = (card, user) => {
    const body = createElement('main', {
        class: 'card-main'
    });

    const bodyContent = [
        // createElement('p', { text: user.status }),
        createDocsContainer(user),
        createInfoLabeled('nascimento', new Date(user.nascimento).toLocaleDateString()),
        createInfoLabeled('e-mail', user.email),
        createLinksContainer(user)
    ];
    
    bodyContent.forEach(line => body.appendChild(line));
    card.appendChild(body);
}

const createInfoLabeled = (field, value) => {
    const wrapper = createElement('div', {class: 'wrapper'});
    const label = createElement('small', {
        text: field
    });
    const data = createElement('div', {
        text: value
    });
    wrapper.appendChild(label);
    wrapper.appendChild(data);

    return wrapper;
}

const createDocsContainer = user => {
    const docsContainer = createElement('div', {
        class: 'documents'
    })

    const docs = [ 'SIAPE', 'MASIS', 'CPF' ];

    docs.forEach( doc => {
        const infoLabeled = createInfoLabeled(doc, user[doc]);
        docsContainer.appendChild(infoLabeled);
    })

    return docsContainer;
}

const createLinksContainer = user => {
    const container = createElement('div', {class: 'links'});

    const labels = ['lattes', 'site', 'Memorial', 'youtube'];

    labels.forEach(label => {
        if(user[label]){
            const link = createElement('a', {
                text: label,
                href: user[label],
                target: '_blank',
                classes: ['button-link', 'label']
            });
            container.appendChild(link);
        }
    })

    return container;
}