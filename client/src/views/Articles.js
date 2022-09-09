import createElement from "../render/HtmlElement.js";
import { get } from "../api/server.js";
import createPagination from "../components/Pagination.js";
import createPageHeader from "../components/PageHeader.js";
import createButtonsWrapper from "../components/ButtonsWrapper.js";
import createArticleFooter from "../components/ElementFooter.js";

const createDetailsWrapper = articles => {
    const wrapper = createElement('div', { class: 'articles-wrapper' });

    Object.keys(articles).forEach( key => {
        const article = articles[key];
        const articleTag = createArticleBlock(article);
        wrapper.appendChild(articleTag);
    } );

    return wrapper;
}

const createArticleBlock = article => {
    const details = createElement('details', { class: 'article' });
    const summary = createSummary(article);
    const body = createArticle(article);

    details.appendChild(summary);
    details.appendChild(body);

    return details;
}

const createSummary = article => {
    const summary = createElement('summary', { class: 'article-summary' });
    const title = createSummaryTitle(article.titulo);
    const buttons = createButtonsWrapper('article', article);

    summary.appendChild(title);
    summary.appendChild(buttons);

    return summary;
}

const createSummaryTitle = title => {
    return createElement('strong', {
        text: title,
        class: 'summary-title'
    });
}

const createArticle = article => {
    const articleTag = createElement('article', { class: 'article-body'});
    const body = createArticleMain(article);
    const footer = createArticleFooter('article-footer', article);

    articleTag.appendChild(body);
    articleTag.appendChild(footer);

    return articleTag;
}

const createArticleMain = article => {
    const main = createElement('main', { 
        class: 'article-body-main'
    });
    const parser = new DOMParser();
    const contents = parser.parseFromString(article.conteudo, 'text/html').body.children;
    
    Object.keys(contents).forEach(key => {
        const content = contents[key];
        if(content){
            main.appendChild(content);
        }
    })

    return main;
}

export default async attributes => {
    const page = (attributes.page ?  attributes.page : 1);
    const articles = await get(`articles&order=updated_at&orderDirection=DESC&paginate&pageLimit=12&page=${page}`); 
    
    const { totalPages, nextPage, previousPage, pageContent } = articles;
    const contentList = createDetailsWrapper( pageContent );

    return [
        createPageHeader('Artigos', 'articleForm'),
        contentList,
        createPagination({ 
            page, 
            totalPages, 
            previousPage, 
            nextPage, 
            routeName:'articles' 
        })
    ];
}