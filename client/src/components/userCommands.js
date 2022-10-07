import createHtml, { createButton, setSelectBlock } from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";

const viewName = "users";

const filters = {
    type: {
        label: "Tipo de servidor",
        handlerChange: event => {renderRoute(viewName, { tipo: event.currentTarget.value});},
        options: [
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
        ]
    },
    exit: {
        label: "Em atividade?",
        handlerChange: event => {renderRoute(viewName, { saida: event.currentTarget.value});},
        options: [        
            {
                value: null,
                text: "Todos",
            },
            {
                value: '0000',
                text: "Ativos",
            },
            {
                value: '0001',
                text: "Inativos"
            }
        ],
    },
    lattes: {
        label: "Lattes",
        handlerChange: event => {renderRoute(viewName, { lattes: event.currentTarget.value});},
        options: [
            {
                value: null,
                text: "Todos",
            },
            {
                value: true,
                text: "Com link para o currículo Lattes",
            },
            {
                value: false,
                text: "Sem link para o currículo Lattes"
            }        
        ],
    },/*     
    site: {
        label: "Site",
        options: [
            {
                value: null,
                text: "Todos",
            },
            {
                value: true,
                text: "Com link para o site",
            },
            {
                value: false,
                text: "Sem link para o site"
            }        
        ],
    },
    youtube: {
        label: "Canal no Youtube",
        options: [
            {
                value: null,
                text: "Todos",
            },
            {
                value: true,
                text: "Com link para o canal do youtube",
            },
            {
                value: false,
                text: "Sem link para o canal do youtube"
            }        
        ],
    } */
}

export default attributes => {
    console.log(attributes)
    const commands = createHtml('nav', { class: "commands"});
    
    // const value = options.find(option => option.type === calendarType).value;
    const buttonCreate = createButton(
        { 
            class: "button",
            title: "Registrar novo servidor",
         }, 
        { 
            src: "./src/assets/images/icons/plus-white.svg",
            alt: "novo servidor"
         }
    );

    Object.keys(filters).forEach(filter => {
        const options = filters[filter].options;
        const labelText = filters[filter].label;

        const selectBlock = setSelectBlock(commands, {
            id: filter,
            labelText,
            options 
        });
        
        selectBlock.children[1].addEventListener('change', filters[filter].handlerChange);
    })
    
    buttonCreate.addEventListener('click', createHandler);
    // 
    
    commands.appendChild(buttonCreate);
    
    return commands;
}

const createHandler = event => {
    renderRoute('scheduleForm', {
        type: event.currentTarget.value,
        id: ''
    });
}

const changeHandler = event => {
    const render = [
        'week',
        'month'
    ];

    const attributes = {
        type: render[event.currentTarget.value]
    }
    
    renderRoute('schedule', attributes);
}