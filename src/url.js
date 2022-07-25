export const HOST = 
    import.meta.env.PROD === true 
        ? API_HOST
        : "http://localhost:28888";


export const AUTH          = HOST + "/api/v1/auth";

export const PROJECT       = HOST + "/api/v1/project";
export const PROJECT_UUID  = (uuid) => PROJECT + `/${uuid}`;

export const PROJECT_LIST  = HOST + "/api/v1/projects";

export const DEPLOY_TOKEN  = HOST + "/api/v1/token";
export const DEPLOY_PULL   = HOST + "/api/v1/pull";
export const DEPLOY_UPLOAD = HOST + "/api/v1/upload";

       const LOG        = HOST + "/api/v1/log";
export const LOG_LIST   = (uuid)         => LOG + `/${uuid}`;
export const LOG_DETAIL = (uuid, log_id) => LOG + `/${uuid}/${log_id}`;
