import { config } from "dotenv";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import purgecss from "@fullhuman/postcss-purgecss";

config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/variables.scss" as *;',
            },
        },

        postcss: {
            plugins: [
                purgecss({
                    content: ["./src/**/*.svelte"],
                    safelist: ["html", "body", "button"],
                }),
            ],
        },
    },

    define: {
        API_HOST: JSON.stringify(process.env.d_API_HOST),
    },
});
