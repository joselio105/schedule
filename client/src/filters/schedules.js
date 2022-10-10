import { renderRoute } from "../routes/management.js";

export default {
    view: attributes => {
        const label = "Visualizar Calendário";
        const handlerChange = event => {
            const render = [
                'week',
                'month'
            ];
        
            const attributes = {
                type: render[event.currentTarget.value]
            }
            
            renderRoute('schedule', attributes);
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
    }    
}