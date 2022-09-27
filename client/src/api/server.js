import { getToken, getUser } from "../tools/Auth.js";
import { hoursStringToInt } from "../tools/Date.js";

export const host = 'http://localhost/arqAdmin/server/?';

const getResponse = async (controller, init) => {

    const request = new Request(
        `${host}${controller}`, 
        init
    );
    
    const result = await fetch(request)
        .then(response => (response.json()))
        .then(responseJson => (responseJson))
        
    return result;
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
    const body = getFormObject(form);

    const headers = new Headers({
        // 'Content-Type': 'application/json',
        // 'Content-Length': body.length.toString(),
        // 'X-Custom-Header': 'ProcessThisImmediately',
        'Authorization': 'Bearer ' + getToken()
    });

    return await getResponse(controller, {
        method: 'POST',
        body,
        headers
    });
}

export const put = async (controller, form, objectId) => {
    const body = getFormJson(form, objectId);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Content-Length': body.length.toString(),
        'X-Custom-Header': 'ProcessThisImmediately',
        'Authorization': 'Bearer ' + getToken()
    });

    const response = await getResponse(controller, {
        method: 'PUT',
        body,
        headers
    });

    return response;
}

export const patch = async (controller, form, objectId) => {
    const body = getFormJson(form, objectId);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Content-Length': body.length.toString(),
        'X-Custom-Header': 'ProcessThisImmediately',
        'Authorization': 'Bearer ' + getToken()
    });

    const response = await getResponse(controller, {
        method: 'PTCH',
        body,
        headers
    });

    return response;
}

export const erase = async (controlerUrl, idObject, attributes={}) => {
    const headers = new Headers({
        // 'Content-Type': 'application/json',
        // 'Content-Length': body.length.toString(),
        // 'X-Custom-Header': 'ProcessThisImmediately',
        'Authorization': 'Bearer ' + getToken()
    });

    const controlerInit = `${controlerUrl}&${idObject.name}=${idObject.value}`;
    const complement = [];
    Object.keys(attributes).forEach(key=>complement.push(`${key}=${attributes[key]}`));

    const controler = complement.length > 0 
        ? controlerInit + '&' + complement.join('&') 
        : controlerInit;
        
    return await getResponse(
        controler,
        {
            method: 'DELETE',
            headers
        }
    )
}

const getFormObject = formData => {
    const userLogged = getUser();

    if(userLogged){
        formData.set('user_id', userLogged.id);    
    }
    
    return formData;
}

const getFormJson = (formData, objectId) => {
    const body =  {};

    if(objectId != null){
        body[objectId.name] = objectId.value;
    }
    
    for (const key of formData.keys()) {
        body[key] = formData.get(key);
        
    }

    return JSON.stringify(body);
}