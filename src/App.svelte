<script>
    import Router from "svelte-spa-router";
    import routes from "./routes.js";

    if (window.location.pathname.indexOf("index.html") == 1) {
        window.location.replace("/" + window.location.hash);
    }
</script>

<Router routes="{routes}" />
