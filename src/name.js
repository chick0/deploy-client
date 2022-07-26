import { USER } from "./url.js";
import { getToken } from "./token.js";

const USER_NAME_KEY = (uuid) => `deploy.user:name:${uuid}`;

export async function fetchName(uuid) {
    let name = sessionStorage.getItem(USER_NAME_KEY(uuid));

    if (name != undefined) {
        return name;
    } else {
        let resp = await fetch(USER(uuid), {
            method: "GET",
            headers: {
                Authorization: getToken(),
            },
        });

        let json = await resp.json();

        sessionStorage.setItem(USER_NAME_KEY(uuid), json.name);
        return json.name;
    }
}
