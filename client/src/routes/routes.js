import login from "../views/Auth/login.js";
import password from "../views/Auth/password.js";
import askPassword from "../views/Auth/askPassword.js";
import notFound from "../views/Common/notFound.js";
import deleteForm from "../views/Common/delete.js";
import articles from "../views/Article/index.js";
import articleForm from "../views/Article/form.js";
import articleView from "../views/Article/view";
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
    articles,
    articleForm,
    articleView,
    users,
    userForm,
    login,
    password,
    askPassword,
    notFound,
    deleteForm
}

export const protectedRoutes = {
    scheduleForm,
    scheduleDelete,
    articleForm,
    users,
    userForm,
    deleteForm
};