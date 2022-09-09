import navAction from "./tools/NavMain.js";
// import renderSchedule from "./render/schedule.js";
import routing from "./routes/management.js"


window.addEventListener('load', async ()=>{
    navAction();
    await routing();
})