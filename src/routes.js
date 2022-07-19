import { wrap } from "svelte-spa-router/wrap";

import Login from "./routes/Login.svelte";

export default {
    "/": Login,

    "*": wrap({
        asyncComponent: () => import("./NotFound.svelte"),
    }),
};
