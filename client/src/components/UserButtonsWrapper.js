import createHtml from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

export default (viewname, pageName, user) => {
    const wrapper = createHtml('nav', { class: "element-header-nav"});

    const buttonDelete = createHtml('button', { classes: ['delete', 'command'], text: "Excluir"});
    const buttonUpdate = createHtml('button', { classes: ['update', 'command'], text: "Editar"});

    buttonDelete.addEventListener('click', ()=>{
        renderRoute('deleteForm', {
            viewname, 
            title: `o(a) ${pageName}(a) ${user.nome}`,
            id: user.id,
        })
    });
    buttonUpdate.addEventListener('click', ()=>{
        renderRoute('userForm', {id: user.id})
    });
    
    wrapper.appendChild(buttonDelete);
    wrapper.appendChild(buttonUpdate);

    return wrapper;
}