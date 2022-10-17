import { getToken, getUser, logout } from "../tools/Auth.js";
import config from "../configs/config.js";

export const get = async (controller, params={}) => {
    const token = getToken();
    
    const paramsArray = Object.keys(params).map(param => (`${param}=${params[param]}`));
    const paramsString = paramsArray.length > 0 ? `&${paramsArray.join('&')}` : '';

    const request = new Request(
        config.apiRoot + controller + paramsString,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    const response = await fetch(request)
        .then(r1 => {
            return r1.json()
        })
        .then(r2 => r2);  
        
    return response;
}

export const post = async (controller, form) => {
    const body = getFormObject(form);

    const response = await fetch(config.apiRoot + controller,
        {
            method: 'POST',
            body,
            headers: {
                'Authorization': `Bearer ${getToken()}`               
            }
        })
        .then(r1 => {
            return r1.json()
        })
        .then(r2 => r2); 
    
    return response;
}

export const put = async (controller, form, objectId) => {
    const body = getFormJson(form, objectId);

    const response = await fetch(config.apiRoot + controller,
        {
            method: 'PUT',
            body,
            headers: {
                'Authorization': `Bearer ${getToken()}`               
            }
        })
        .then(r1 => {
            console.log(r1)
            return r1.json()
        })
        .then(r2 => r2)
        .catch(error => console.log(error)); 
    
    return response;
}

export const patch = async (controller, form, objectId) => {
    const body = getFormJson(form, objectId);

    const response = await fetch(config.apiRoot + controller,
        {
            method: 'PATCH',
            body,
            headers: {
                'Authorization': `Bearer ${getToken()}`               
            }
        })
        .then(r1 => {
            return r1.json()
        })
        .then(r2 => r2); 
    
    return response;
}

export const erase = async (controlerUrl, idObject, attributes={}) => {
    const headers = {
        'Content-Type': 'application/json',
        // 'X-Custom-Header': 'ProcessThisImmediately',
        'Authorization': 'Bearer ' + getToken()
    };

    const controlerInit = `${controlerUrl}&${idObject.name}=${idObject.value}`;
    const complement = [];
    Object.keys(attributes).forEach(key=>complement.push(`${key}=${attributes[key]}`));

    const controller = controlerInit + (complement.length > 0 
        ? '&' + complement.join('&') 
        : "");

    const request = new Request(
        config.apiRoot + controller,
        {
            method: 'DELETE',
            headers
        }
    );

    const response = await fetch(request)
        .then(r1 => {
            return r1.json()
        })
        .then(r2 => r2);  
    
    return response;
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