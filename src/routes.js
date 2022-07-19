import { wrap } from "svelte-spa-router/wrap";

export default {
    "/": wrap({
        asyncComponent: () => import("./routes/Login.svelte"),
    }),

    "/projects": wrap({
        asyncComponent: () => import("./routes/Projects.svelte"),
    }),

    "*": wrap({
        asyncComponent: () => import("./NotFound.svelte"),
    }),
};
