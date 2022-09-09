export default async (view, attributes={}) => {
    const container = document.querySelector('#container .content-page');

    container.innerHTML = '';
    const response = await view(attributes);
    
    if(Array.isArray(response)){
        response.forEach(element => {
            container.appendChild(element);
        })
    }else{
        container.appendChild(view(attributes));
    }    
}