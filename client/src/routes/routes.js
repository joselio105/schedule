import login from "../views/Login.js";
import notFound from "../views/NotFound.js";
import articles from "../views/Articles.js";
import articleForm from "../views/ArticleForm.js";
import users from "../views/Users.js";
import userForm from "../views/UserForm.js";
import schedule from "../views/Schedule.js";
import scheduleView from "../views/ScheduleView.js";
import scheduleForm from "../views/ScheduleForm.js";

export default {
    schedule,
    scheduleForm,
    scheduleView,
    articles,
    articleForm,
    users,
    userForm,
    login,
    notFound
}

export const protectedRoutes = {
    scheduleForm,
    articles,
    articleForm,
    users,
    userForm
};