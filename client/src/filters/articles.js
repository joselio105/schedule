import { get } from "../api/server.js";
import { renderRoute } from "../routes/management.js";

const classes = await get('articleClasses', {
    order: 'nome'
});

const classOptions = classes.map(classe => {
    return {
        value: classe.id,
        text: classe.nome
    }    
});
classOptions.unshift({
    value: null,
    text: 'Todos'
});

export const viewName = "articles";
export const fromName = "articleForm";
export const viewPage = "articleView";
export const pageName = "artigo";

export default {
    local: attributes => {
        const label = "Abrangência do artigo";
        const handlerChange = event => {
            attributes.local = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = [
            {
                value: null,
                text: "Todos",
            },
            {
                value: true,
                text: "Local",
            },
            {
                value: false,
                text: "Geral"
            }
        ];

        return {
            label,
            handlerChange,
            options
        }
    },    
    class: attributes => {
        const label = "Classe do artigo";
        const handlerChange = event => {
            attributes.class = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = classOptions;

        return {
            label,
            handlerChange,
            options
        }
    },    
    expired: attributes => {
        const label = "Validade do artigo";
        const handlerChange = event => {
            attributes.expired = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = [
            {
                value: null,
                text: "Todos",
            },
            {
                value: true,
                text: "Expirado",
            },
            {
                value: false,
                text: "Válido"
            }
        ];

        return {
            label,
            handlerChange,
            options
        }
    }
}