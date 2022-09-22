import { getToken, getUser } from "../tools/Auth.js";

const getResponse = async (controller, init) => {
    const url = 'http://localhost/arqAdmin/server/?';
    
    const request = new Request(`${url}${controller}`, init);
    const response = await fetch(request).then(resp=>resp);

    return response;
}

export const get = async (controller, params={}) => {
    const token = getToken();
    const headers = new Headers();

    const paramsArray = Object.keys(params).map(param => (`${param}=${params[param]}`));
    const paramsString = paramsArray.length > 0 ? `&${paramsArray.join('&')}` : '';

    if(token){
        headers.set('Authorization', `Bearer ${token}`);
    }
    const response = await getResponse(controller + paramsString, {
        method: 'GET',
        headers
    });

    return response;
}

export const post = async (controller, form) => {
    const response = await getResponse(controller, {
        method: 'POST',
        body: getFormObject(form),
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });

    return response;
}

export const put = async (controller, form, objectId) => {
    const response = await getResponse(controller, {
        method: 'PUT',
        body: getFormJson(form, objectId),
        headers: new Headers({
            'Authorization': 'Bearer ' + getToken()
        })
    });

    return response;
}

export const erase = async () => {}

const getFormObject = form => {
    const formData = new FormData(form);
    const userLogged = getUser();

    if(userLogged){
        formData.set('user_id', userLogged.id);    }
    
    
    return formData;
}

const getFormJson = (form, id) => {
    const body =  { id };

    const formData = new FormData(form);
    for (const key of formData.keys()) {
        body[key] = formData.get(key)
    }
    body.user_id = getUser().id;
    

    return JSON.stringify(body);
}