import createHtml from "../render/HtmlElement.js";

export default attributes => {
    const wrapper = createHtml('nav', { class: "buttons-wrapper"});

    return wrapper;
}