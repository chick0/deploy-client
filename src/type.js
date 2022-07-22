export const TYPE = {
    0: "FRONT-END",
    1: "BACK-END",
    2: "BOT",
};

export function getLabel(type) {
    return TYPE[type];
}

export function getColor(type) {
    return {
        0: "is-primary",
        1: "is-info",
        2: "is-danger",
    }[type];
}

export function getTypeId(type) {
    return Number(Object.keys(TYPE).find((key) => TYPE[key] === type));
}
