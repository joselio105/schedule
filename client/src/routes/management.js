import routes, { protectedRoutes } from "./routes.js";
import render from "../tools/Render.js";
import { isAuthenticated } from "../tools/Auth.js";
import NavAuth from "../tools/NavAuth.js";

const attribute = {};

export const defaultView = "schedule";

export default async () => {
    const links = document.getElementsByClassName('route');

    NavAuth();
    await render(routes[defaultView]);

    for(const link of links){
        link.addEventListener('click', event => {
            event.preventDefault();
        
            const viewNames = link.href.split('/');
            const viewName = viewNames[viewNames.length-1];

            renderRoute(viewName);
        })
    }   
}

const autenticate = route => {
    if(isAuthenticated()){
        return route;
    }
    attribute.message = 'É necessário fazer o login';
    return routes['login'];
}

export const renderRoute = (viewname, attributes = {}) => {
    const route = (routes.hasOwnProperty(viewname) ? routes[viewname] : routes.notFound);
    const routeToRender = (protectedRoutes.hasOwnProperty(viewname) ? autenticate(route) : route);
    
    NavAuth();
    render(routeToRender, attributes);
}