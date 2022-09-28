import navAction from "./tools/NavMain.js";
import routing, { renderRoute } from "./routes/management.js"

window.addEventListener('load', async ()=>{
    navAction();
    
    const params = getparams();
    if(params.hasOwnProperty('token')){
        renderRoute(
            'password',
            {
                token: params.token
            }
        );
    }else{
        await routing();
    }  
    
})

const getparams = () => {
    const queryString = location.search;
    const params = {};

    queryString.split('&').forEach(clauses => {
        const [ key, value ] = clauses.split('=');
        params[key] = value;
    })

    return params;
}