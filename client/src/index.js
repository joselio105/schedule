import navAction from "./tools/NavMain.js";
import routing from "./routes/management.js"


window.addEventListener('load', async ()=>{
    navAction();
    await routing();
})