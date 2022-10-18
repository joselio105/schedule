export const viewName = "articles";
export const fromName = "articleForm";
export const viewPage = "articleView";
export const pageName = "artigo";

export default {
    classeId: attributes => {
        const label = "Classe do artigo";
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
                value: 18,
                text: "Geral",
            },
            {
                value: 19,
                text: "Local"
            }
        ];

        return {
            label,
            handlerChange,
            options
        }
    }
}