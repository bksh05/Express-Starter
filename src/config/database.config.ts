
const env = (process.env) as any;
/**
 * Database related configuration
 * Most of these values are imported from .env file
 */
const DATABASE_CONFIG = {
    URL : `mongodb://${env.MONGO_DB_USER}:${env.MONGO_DB_PASS}@${env.MONGO_DB_HOST}:${env.MONGO_DB_PORT}/${env.MONGO_DB_NAME}?authSource=admin&replicaSet=globaldb&maxIdleTimeMS=120000&readPreference=primary&appname=%40wearplace-db%40&retryWrites=false&ssl=true`,
    POOL_SIZE : 1
}


export default DATABASE_CONFIG;