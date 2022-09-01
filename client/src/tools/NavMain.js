import createElement from "../render/HtmlElement.js";

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