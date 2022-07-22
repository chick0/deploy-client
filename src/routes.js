import Login from "./routes/Login.svelte";
import Dashboard from "./routes/Dashboard.svelte";

import ProjectList from "./routes/ProjectList.svelte";
import ProjectCreate from "./routes/ProjectCreate.svelte";
import Project from "./routes/Project.svelte";

import NotFound from "./NotFound.svelte";

export default {
    "/": Login,
    "/dashboard": Dashboard,

    "/project": ProjectList,
    "/project/create": ProjectCreate,
    "/project/:uuid": Project,

    "*": NotFound,
};
