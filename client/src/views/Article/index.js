import { get } from "../../api/server.js";
import createPagination from "../../components/Pagination.js";
import createHtml from "../../render/HtmlElement.js";
import createCommands from "../../components/pageCommands";
import filters, { viewName, viewPage, pageName, fromName } from "../../filters/articles.js";
import { renderRoute } from "../../routes/management.js";

const createDetailsWrapper = articles => {
    const wrapper = createHtml('div', { class: 'articles-wrapper' });
    
    Object.keys(articles).forEach( key => {
        const article = articles[key];
        const articleTag = createArticleBlock(article);
        wrapper.appendChild(articleTag);
    } );

    return wrapper;
}

const createArticleBlock = article => {
    const line = createHtml('div', { class: 'article' });
    const button = createHtml('button', { text: "visualizar"});
    const title = createHtml('strong', { text: article.titulo});

    button.addEventListener('click', ()=>{
        renderRoute(viewPage, { article })
    })
    
    line.appendChild(button);
    line.appendChild(title);

    return line;
}

export default async attributes => {
    document.title = "ARQ/UFSC | Artigos";

    attributes.page = (attributes.hasOwnProperty('page') ?  attributes.page : 1);
    const params = {
        paginate: true,
        pageLimit: 12,
        page: attributes.page,
        order: "updated_at",
        orderDirection: "DESC"
    }
    attributes.filters = filters;
    attributes.pageName = pageName;
    attributes.formName =  fromName;

    const articles = await get(viewName, params); 
    
    const { totalPages, nextPage, previousPage, pageContent } = articles;

    return [
        createHeader(attributes),
        createDetailsWrapper( pageContent ),
        createPagination({ 
            page: attributes.page, 
            totalPages, 
            previousPage, 
            nextPage, 
            routeName:'articles' 
        })
    ];
}

const createHeader = attributes => {
    const pageHeader = createHtml('header');
    const titleTag = createHtml('h2', {text: 'Artigos'});

    pageHeader.appendChild(titleTag);
    pageHeader.appendChild(createCommands(attributes));
    
    return pageHeader;
}