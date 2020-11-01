/**
 * Database related configuration
 * Most of these values are imported from .env file
 */
const DATABASE_CONFIG = {
    URL : `mongodb://${(process.env as any).MONGO_DB_HOST}:${(process.env as any).MONGO_DB_PORT}/${(process.env as any).MONGO_DB_NAME}`,
    PASSWORD : (process.env as any).MONGO_DB_PASS,
    USER : (process.env as any).MONGO_DB_USER,
    POOL_SIZE : 1,
    KEEP_ALIVE : true
}


export default DATABASE_CONFIG;