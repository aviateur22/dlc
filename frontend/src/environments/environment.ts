import { environmentDev } from "./environment.dev";

/**
 * Dev - LocalServer
 */
export const environment = {  
  production: environmentDev.production, 
  name: environmentDev.name,
  domain: environmentDev.domain,
  api: environmentDev.api,
  baseUrl: environmentDev.domain + environmentDev.api
};