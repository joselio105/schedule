import createElement from "../../render/HtmlElement.js";
import createFom from "../../components/Form.js";
import FormBlockInput from "../../components/FormBlockInput.js";
import FormBlockSelect from "../../components/FormBlockSelect.js";
import { get, post, put } from "../../api/server.js";
import { renderRoute } from "../../routes/management.js";
import setFeedback, { setFeedbackMessage } from "../../components/Feedback.js";
import { setLoading, unsetLoading } from "../../components/Loading.js";
import FormCheckboxes from "../../components/FormCheckboxes.js";

export default async attributes => {
    let user = {};
    
    if(attributes.id){
        user = await get(`users&id=${attributes.id}`);
    }

    return [
        createElement('h2', {text: 'Usuário'}),
        setFeedback(),
        createForm(user)
    ];
}

const createForm = user => {
    const fields = getFields(user);
    const buttons = getButtons(user);
    const form = createFom(fields, buttons);

    form.addEventListener('submit', event => handleSubmit(event, user.id));
    return form;
}

const getFields = user => {
    return [
        FormBlockInput('nome', 'Nome', {
            required: true,
            value: (user.primeiroNome ? user.primeiroNome : ''),
            placeholder: 'Digite seu nome'
        }),
        FormBlockInput('sobrenome', 'Sobrenome', {
            required: true,
            value: (user.sobrenome ? user.sobrenome : ''),
            placeholder: 'Digite seu sobrenome'
        }),
        FormBlockInput('email', 'E-Mail', {
            type: 'email', 
            required: true,
            value: (user.email ? user.email : ''),
            placeholder: 'Digite seu email'
        }),
        FormBlockInput('SIAPE', 'Siape', {
            required: true,
            value: (user.SIAPE ? user.SIAPE : ''),
            placeholder: 'Digite sua matrícula SIAPE'
        }),
        FormBlockInput('MASIS', 'Masis', {
            required: true,
            value: (user.MASIS ? user.MASIS : ''),
            placeholder: 'Digite sua matrícula MASIS'
        }),
        FormBlockInput('CPF', 'Cpf', {
            required: true,
            value: (user.CPF ? user.CPF : ''),
            placeholder: 'Digite seu CPF'
        }),
        FormBlockInput('nascimento', 'Nascimento', {
            type: 'date',
            required: true,
            value: (user.nascimento ? user.nascimento : ''),
            placeholder: 'Digite sua data de nascimento'
        }),
        FormBlockSelect('tipo', 'Tipo', {
            'Docente': 'sdo',
            'Tecnico Administrativo': 'sta'
        }, { value: user.tipo}),
        FormBlockInput('site', 'Site', {
            type: 'url',
            value: (user.site ? user.site : ''),
            placeholder: 'Digite a URL do seu site'
        }),
        FormBlockInput('lattes', 'Lattes', {
            type: 'url',
            value: (user.lattes ? user.lattes : ''),
            placeholder: 'Digite a URL do seu currículo lattes'
        }),
        FormBlockInput('youtube', 'Youtube', {
            type: 'url',
            value: (user.youtube ? user.youtube : ''),
            placeholder: 'Digite a URL do seu canal do youtube'
        }),
        FormBlockInput('ingresso', 'Entrada', {
            value: (user.ingresso ? user.ingresso : new Date().getFullYear()),
            placeholder: 'Digite o ano de entrada do servuidor'
        }) ,
        FormBlockInput('saida', 'Saída', {
            value: (user.saida ? user.saida : '0000'),
            placeholder: 'Digite o ano de desligamento do servidor'
        })  ,
        FormCheckboxes("Permissões", getPermitionOptions(user))    
    ];
}

const getButtons = user => {
    const buttons = [
        createElement('button', {
            class: 'back',
            text: 'voltar',
            id: 'users'
        }),
        createElement('button', { 
            type: 'submit', 
            classes: ['submit', (user.id ? 'update' : 'create')],
            value: user.id,
            text: 'enviar'
        })
    ];

    buttons[0].addEventListener('click', handleBack);

    return buttons;
}

const getPermitionOptions = user => {
    const permitionsOptions = [
        {
            id: "permitions",
            value: "auth",
            label: "Autenticação",
        },
        {
            id: "permitions",
            value: "users",
            label: "Usuários",
        },
        {
            id: "permitions",
            value: "schedule",
            label: "Agenda",
        },
        {
            id: "permitions",
            value: "articles",
            label: "Artigos",
        },
        {
            id: "permitions",
            value: "files",
            label: "Arquivos",
        },
        {
            id: "permitions",
            value: "secctions",
            label: "Setores",
        },
        {
            id: "permitions",
            value: "place",
            label: "Cargos",
        },
    ];

    if(user.hasOwnProperty('permitions')){
        permitionsOptions.forEach( option => {
            option.checked = user.permitions.includes(option.value);
        })
    }

    return permitionsOptions;
}

const handleSubmit = async (event, id) => {
    event.preventDefault();
    
    const form = new FormData(event.currentTarget);

    form.set('permitions', form.getAll('permitions').join(', '));
    setLoading()
    if(id){        
        const result = await put(
            'users', 
            form, 
            {
                name: 'id',
                value: parseInt(id)
            }
        );
        
        if(result.hasOwnProperty('error')){
            setFeedbackMessage(result.error);
        }else{
            renderRoute('users', result);
        }
    }else{
        const result = await post(
            'users',
            form
        );

        if(result.hasOwnProperty('error')){
            setFeedbackMessage(result.error);
        }else{
            renderRoute('users', result);
        }        
    }    
    unsetLoading();
    
}

const handleBack = event => {
    const backTo = event.currentTarget.id;
    renderRoute(backTo);
}