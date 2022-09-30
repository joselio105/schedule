import config from "../configs/config.js";
import createElement from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";
import { getUser } from "./Auth.js";

export default () => {
    const buttonHome = document.querySelector('#container .inner .logo');
    const buttonNav = document.querySelector('.button-open-nav');
    const navMain = document.querySelector('.main-nav');
    
    const iconClose = createElement('img', {
        src: './src/assets/images/icons/x.svg',
        alt: 'ícone para fechar o menu'
    });

    buttonHome.setAttribute('href', config.clientRoot);

    buttonNav.addEventListener('click', ()=>{
        
        if(buttonNav.innerHTML === iconClose){
            navMain.classList.add('close');
        }else{
            navMain.classList.remove('close');

            const li = createElement('li');
            const button = createElement('button', { classes: ['btn-close-nav']});

            button.addEventListener('click', () => {
                navMain.classList.add('close');

                navMain.removeChild(button);
            })

            button.appendChild(iconClose);
            navMain.appendChild(button);
        }
        
    })
}

export const renderNav = viewName => {
    const viewFamily = viewName.split(/[A-Z]{1}/)[0];
    const container = document.getElementById("main-nav");
    container.textContent = '';

    const user = getUser();

    const links = [
        {
            text: "Agenda",
            classes: ["route"],
            value: "schedule"
        },
        {
            text: "Artigos",
            classes: ["route"],
            value: "articles"
        },
        {
            text: "Arquivos",
            classes: ["route"],
            value: "files"
        },
        {
            text: "Setores",
            classes: ["route"],
            value: "sectors"
        },
        {
            text: "Cargos",
            classes: ["route"],
            value: "positions"
        },
        {
            text: "Servidores",
            classes: ["route"],
            value: "users"
        },
    ];

    if(user){
        const ul = createElement('ul');
        links.forEach(link => {
            
            if(user.permitions.includes(link.value)){
                const li = createElement('li');
                viewFamily === link.value ? li.classList.add('active') : null;
                const button = createElement('button', link);

                button.addEventListener('click', () => {
                    renderRoute(link.value);
                    link.classList.add('active');
                })

                li.appendChild(button);
                ul.appendChild(li);
            }            
        })
        container.appendChild(ul);
    }
}