import login from "../views/Auth/login.js";
import password from "../views/Auth/password.js";
import askPassword from "../views/Auth/askPassword.js";
import notFound from "../views/NotFound.js";
// import articles from "../views/Article/index.js";
// import articleForm from "../views/Article/form.js";
import users from "../views/User/index.js";
import userForm from "../views/User/form.js";
import schedule from "../views/Schedule/index.js";
import scheduleView from "../views/Schedule/view.js";
import scheduleForm from "../views/Schedule/form.js";
import scheduleDelete from "../views/Schedule/delete.js";

export default {
    schedule,
    scheduleForm,
    scheduleDelete,
    scheduleView,
    // articles,
    // articleForm,
    users,
    userForm,
    login,
    password,
    askPassword,
    notFound
}

export const protectedRoutes = {
    scheduleForm,
    scheduleDelete,
    // articles,
    // articleForm,
    users,
    userForm
};