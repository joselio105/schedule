import createElement from "../render/HtmlElement.js";
import { getUser, isAuthenticated, logout } from "./Auth.js";
import { renderRoute } from "../routes/management.js";

const navAuth = document.querySelector('.auth-nav');

const handleClick = event => {
    event.preventDefault();
    const viewName = event.target.id;

    const actions = {
        exit: () => {
            logout();
            restoreMenu();
            renderRoute('login');
        },
        userView: () => {
            renderRoute('userView', {userId: getUser['id']});
        }
    };

    actions[viewName]();
}

const createMenu = () => {
    navAuth.innerHTML = '';
    navAuth.appendChild(getTitle());
    navAuth.appendChild(getNav());
}

const restoreMenu = () => {    
    navAuth.innerHTML = '';
    const buttonLogin = createElement('button', {
        href: "login",
        'classes': ["login", "route"]
    });
    const image = createElement('img', {
        src: './src/assets/images/icons/unlock.svg'
    });

    buttonLogin.appendChild(image);
    navAuth.appendChild(buttonLogin);

    buttonLogin.addEventListener('click', ()=>renderRoute('login'));
}

const getTitle = () => {
    const user = getUser();
    const nameArray = user.nome.split(' ');
    const text = nameArray[0].slice(0, 1) + nameArray[nameArray.length -1].slice(0, 1);

    return createElement('strong', {text, class: 'auth-title'});
}

const getNav = () => {
    const itens = [
        {
            text: 'Perfil',
            id: 'userView',
            classes: ['route']
        },     
        {
            text: 'Logout',
            id: 'exit',
            classes: ['route']
        }
    ];

    const list = createElement('ul', {class: 'auth-list'});
    itens.forEach(item => {
        const listItem = createElement('li');
        const listLink = createElement('button', item);
        
        listLink.addEventListener('click', handleClick);

        listItem.appendChild(listLink);
        list.appendChild(listItem);
    })

    return list;
}

export default ()=>{
    restoreMenu();

    if(isAuthenticated()){
        createMenu();
    }else{
        restoreMenu();
    }
}