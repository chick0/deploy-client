import { Buffer } from "buffer/";

const AUTH_TOKEN_KEY = "deploy.token:auth";

export function getToken() {
    return "Bearer " + localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getPayload() {
    let token = getToken().slice(7).split(".");

    if (token.length != 3) {
        return undefined;
    } else {
        return JSON.parse(Buffer.from(token[1], "base64").toString());
    }
}
