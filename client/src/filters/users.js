import { renderRoute } from "../routes/management.js";

export const viewName = "user";
export const pageName = "servidor";

export default {    
    tipo: attributes => {
        const label = "Tipo de servidor";
        const handlerChange = event => {
            attributes.tipo = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = [
            {
                value: null,
                text: "Todos",
            },
            {
                value: 'sdo',
                text: "Docente",
            },
            {
                value: 'sta',
                text: "Técnico/ Administrativo"
            }
        ];

        return {
            label,
            handlerChange,
            options
        }
    },
    saida: attributes => {
        const label = "Em atividade?";
        const handlerChange = event => {
            attributes.saida = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = [       
            {
                value: null,
                text: "Todos",
            },
            {
                value: "false",
                text: "Ativos",
            },
            {
                value: "true",
                text: "Inativos"
            }
        ];

        return {
            label,
            handlerChange,
            options
        }
    },
    lattes: attributes => {
        const label = "Lattes";
        const handlerChange = event => {
            attributes.lattes = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = [
            {
                value: null,
                text: "Todos",
            },
            {
                value: "true",
                text: "Com link para o currículo Lattes",
            },
            {
                value: "false",
                text: "Sem link para o currículo Lattes"
            }        
        ];

        return {
            label,
            handlerChange,
            options
        }
    },
    site: attributes => {
        const label = "Site";
        const handlerChange = event => {
            attributes.site = event.currentTarget.value;
            renderRoute(viewName, attributes);
        };
        const options = [
            {
                value: null,
                text: "Todos",
            },
            {
                value: "true",
                text: "Com link para o site",
            },
            {
                value: "false",
                text: "Sem link para o site"
            }        
        ];

        return {
            label,
            handlerChange,
            options
        }
    },
}