import createElement from "../render/HtmlElement.js";
import { renderRoute } from "../routes/management.js";
import { getAuth, getUser } from "./Auth.js";

export default () => {
    const buttonNav = document.querySelector('.button-open-nav');
    const navMain = document.querySelector('.main-nav');
    const iconMenu = createElement('img', {
        src: './src/assets/images/icons/menu.svg',
        alt: 'ícone para abrir o menu'
    });
    const iconClose = createElement('img', {
        src: './src/assets/images/icons/x.svg',
        alt: 'ícone para fechar o menu'
    });

    buttonNav.addEventListener('click', ()=>{
        if(buttonNav.innerHTML === iconClose){
            navMain.classList.add('close');
            
            buttonNav.innerHTML = iconMenu;
            // buttonNav.appendChild(iconMenu);
        }else{
            navMain.classList.remove('close');
            
            buttonNav.innerHTML = iconClose;
            // buttonNav.appendChild(iconClose);
        }
        
    })
}

export const renderNav = () => {
    const container = document.getElementById("main-nav");
    container.textContent = '';

    const user = getUser();

    const links = [
        {
            text: "Agenda",
            classes: ["route"],
            value: "schedules"
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
                const button = createElement('button', link);

                button.addEventListener('click', () => {
                    renderRoute(link.value);
                    link.classes.add('active');
                })

                li.appendChild(button);
                ul.appendChild(li);
            }            
        })
        container.appendChild(ul);
    }
}