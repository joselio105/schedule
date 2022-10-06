export default class{

    constructor(componentName, isView=false){
        this.componentName = componentName;

        this.stylePath = isView ? './src/views/' : './src/components/';
        this.setStyle();
    }

    /**
     * Cria uma tag HTML
     * @param string tag 
     * @param {*} params 
     * @returns
     */
    createHtmlTag(tag, params={}){
        const element = document.createElement(tag);
        
        Object.keys(params).forEach(key => {
            if(key === 'classes'){
                params[key].forEach(className => {
                    element.classList.add(className);
                })
            }else if(key === 'text'){
                element.textContent = params[key];
            }else{
                element.setAttribute(key, params[key]);
            }
    
        })
    
        return element;        
    }

    /**
     * Define a estilização do compomente
     */
    async setStyle(){
        this.styles = document.createElement('style');
        this.styles.textContent = await fetch(`${this.stylePath}${this.componentName}/styles.css`);
    }
}