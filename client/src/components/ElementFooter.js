import createElement from "../render/HtmlElement.js";

export default (className, object) => {
    const footer = createElement('footer', {
        class: className
    });

    const lineAuthor =  createElement('p', {
        text: "Atualizado por: "
    });
    const author = createElement('strong', {
        text: object.user
    });
    lineAuthor.appendChild(author);
    footer.appendChild(lineAuthor);

    const date = new Date(object.updated_at);
    const lineDate = createElement('p', {
        text: "Atualizado em: "
    });
    const time = createElement('time', {
        text: date.toLocaleString(),
        datetime: date.toLocaleDateString + date.toTimeString(),
        pubdate: true
    });

    lineDate.appendChild(time);
    footer.appendChild(lineDate);

    return footer;
}