import createHtml from "../../render/HtmlElement.js";
import { viewName, fromName} from "../../filters/articles.js";
import { renderRoute } from "../../routes/management.js";

export default attributes => {
    const { article } = attributes;
    console.log(article)

    return [
        createHtml('h2', { text: article.titulo }),
        createArticle(article),
        setButtons(article)
    ]
}

const createArticle = article => {
    const container = createHtml('article', { class: "article" });
    const body = createArticleBody(article);
    const footer = createArticleFooter(article);

    container.appendChild(body);
    container.appendChild(footer);

    return container;
}

const createArticleBody = article => {
    const body = createHtml('main', { class: "article-body " });

    //https://arq.ufsc.br/img/artigos/peixe.jpg
    if(article.capa){
        const capa = createHtml('img', {
            src: `https://arq.ufsc.br/img/artigos/${article.capa}`,
            alt: article.titulo
        });

        body.appendChild(capa);
    }
    
    const parser = new DOMParser();
    const contents = parser.parseFromString(article.conteudo, 'text/html').body.children;
    
    Object.keys(contents).forEach(key => {
        const content = contents[key];
        if(content){
            body.appendChild(content);
        }
    })

    return body;
}

const createArticleFooter = article => {
    const footer = createHtml('footer', { class: "article-footer" });
    const wrapper = createHtml('div', { class: "article-info"});
    const infoDatas = [
        createHtml('div', { 
            class: "info", 
            text: article.classe
        }),
        createHtml('div', { 
            classes: article.local === "1" ? ["info", "local"] : ["info", "geral"], 
            text: article.local === "1" ? 'Local' : 'Geral'
        }),
        article.expires_at ? createHtml('time', { 
            class: "info", 
            text: new Date(article.expires_at).toLocaleDateString()
        }) : null,
    ];

    infoDatas.forEach(infoData => infoData ? wrapper.appendChild(infoData) : null);
    footer.appendChild(wrapper);
    
    footer.appendChild(createInfoLabeled(
        'Publicado por: ', 
        article.autor
    ));
    footer.appendChild(createInfoLabeled(
        'Publicado em: ', 
        new Date(article.updated_at).toLocaleDateString()
    ));

    return footer;
}

const createInfoLabeled = (field, value) => {
    const wrapper = createHtml('div', {class: 'wrapper'});
    const label = createHtml('small', {
        text: field
    });createHtml
    const data = createHtml('strong', {
        text: value
    });
    wrapper.appendChild(label);
    wrapper.appendChild(data);

    return wrapper;
}

const setButtons = article => {
    const buttonsWrapper = createHtml('nav', { class: "commands" });

    const buttons = [
        createHtml('button', {
            id: "button-back",
            classes: ["button"],
            value: viewName,
            text: "Voltar"
        }),
        createHtml('button', {
            id: "button-update",
            classes: ["button"],
            value: article.id,
            text: "Editar"
        }),
        createHtml('button', {
            id: "button-delete",
            classes: ["button", "delete"],
            value: JSON.stringify(article),
            text: "Excluir"
        })
    ];

    setActions(buttons);

    buttons.forEach( button => buttonsWrapper.appendChild(button));

    return buttonsWrapper;
}

const setActions = buttons => {
    const buttonBack = buttons.find(button => button.id === "button-back");
    const buttonUpdate = buttons.find(button => button.id === "button-update");
    const buttonDelete = buttons.find(button => button.id === "button-delete");

    buttonBack.addEventListener('click', backHandler);
    buttonUpdate.addEventListener('click', updateHandler);
    buttonDelete.addEventListener('click', deleteHandler);
}

const backHandler = event => {
    console.log(event.currentTarget.value)
    renderRoute(event.currentTarget.value);
}

const updateHandler = event => {
    renderRoute(fromName, {id: event.currentTarget.value});
}

const deleteHandler = event => {
    const article = JSON.parse(event.currentTarget.value);
    renderRoute(
        'deleteForm', 
        {
            article
        }
        )
}