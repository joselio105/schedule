import createHtml from "../../render/HtmlElement.js";
import filters, { viewName, pageName, fromName} from "../../filters/articles.js";
import { renderRoute } from "../../routes/management.js";

export default attributes => {
    const { article } = attributes;
    console.log(article)

    return [
        createHtml('h2', { text: article.titulo }),
        setButtons(article)
    ]
}

const setButtons = article => {
    const buttonsWrapper = createHtml('nav', { class: "commands" });

    const buttons = [
        createHtml('button', {
            id: "button-back",
            classes: ["button"],
            value: pageName,
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