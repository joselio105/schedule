import routes, { protectedRoutes } from "./routes.js";
import render from "../tools/Render.js";
import { isAuthenticated } from "../tools/Auth.js";
import NavAuth from "../tools/NavAuth.js";
import { renderNav } from "../tools/NavMain.js";

const attribute = {};

export const defaultView = "users";

export default async () => {

    NavAuth();
    renderNav(defaultView);
    await render(routes[defaultView]);
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
    renderNav(viewname);
    render(routeToRender, attributes);
}