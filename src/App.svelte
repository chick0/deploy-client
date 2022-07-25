<script>
    import Router from "svelte-spa-router";
    import { location } from "svelte-spa-router";
    import routes from "./routes.js";

    if (window.location.pathname.indexOf("index.html") == 1) {
        window.location.replace("/" + window.location.hash);
    }

    let hide = true;

    location.subscribe((path) => {
        if (path == "/") {
            hide = true;
        } else {
            hide = false;
        }
    });
</script>

<Router routes="{routes}" />

{#if hide == false}
    <section class="section"></section>
{/if}
