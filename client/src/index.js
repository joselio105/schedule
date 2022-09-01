import navAction from "./tools/NavMain.js";
import renderSchedule from "./render/schedule.js";


window.addEventListener('load', async ()=>{
    navAction();
    renderSchedule();
})