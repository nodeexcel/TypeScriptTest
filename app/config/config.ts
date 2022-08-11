import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: '.env' });

export const CONF_ENV: string = process.env.CONF_ENV || 'local';
export const PORT: string | number = process.env.PORT || 3000;
export const ROOT = path.normalize(__dirname + '/..'); // Root path of server
export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'debug';
export const MONGO_DEBUG: string = process.env.MONGO_DEBUG;
export const WEATHER_KEY: string = process.env.WEATHER_KEY;
export const APP_KEY: string = process.env.APP_KEY;
// ATLAST Url
export const MONGO_APP_URL = process.env.ATLAST_DB_URL;
console.log(MONGO_APP_URL);
