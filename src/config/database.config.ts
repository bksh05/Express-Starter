
const env = (process.env) as any;
/**
 * Database related configuration
 * Most of these values are imported from .env file
 */
const DATABASE_CONFIG = {
    URL : `mongodb+srv://${env.MONGO_DB_USER}:${env.MONGO_DB_PASS}@${env.MONGO_DB_HOST}${env.MONGO_DB_PORT ? `:${env.MONGO_DB_PORT}`: ''}/${env.MONGO_DB_NAME}${env.MONGO_AUTHENTICATION_DB?'?authSource='+env.MONGO_AUTHENTICATION_DB:''}`,
    POOL_SIZE : 1
}


export default DATABASE_CONFIG;