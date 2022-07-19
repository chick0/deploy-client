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
