import Component from "../components/Component.js";

export default class View extends Component{

    constructor(viewName, title){
        super(viewName, true);

        this.title = this.createTitle(title);
    }

    createTitle(text){
        return this.createHtmlTag('h2', { text });
    }

    createView(){
        return [
            this.title
        ]
    }
}