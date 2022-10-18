import createElement from "../render/HtmlElement.js";
import createButtonsWrapper from "./UserButtonsWrapper.js";
import createCardFooter from "../components/ElementFooter.js";
import { pageName, viewName} from "../filters/users.js";

export default user => {
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

    const nav = createButtonsWrapper(viewName, pageName, user);

    header.appendChild(title);
    header.appendChild(nav);
    card.appendChild(header);
}

const getCardBody = (card, user) => {
    const body = createElement('main', {
        class: 'card-main'
    });

    const bodyContent = [
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