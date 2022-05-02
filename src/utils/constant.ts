
/**
 * Define all string or numeric constants over here
 * Gives a control at a single place
 * Helps to support multilingual apps (English, French, Hindi)
 */

export let constants = {
    START_MESSAGE : "Awesome!!! Your app has started and your API is live on PORT:",
    MONGO_DB_FAIL_MESSAGE : "Failed to connect to Db",
    OTP_LENGTH : 5,


    // Error objects

    BAD_REQUEST :  {
        code : 400,
        message : "Bad request"
    },

    INTERNAL_SERVER_ERROR : {
        code : 500,
        message : "Internal server error"

    },

    UNAUTHORIZED : {
        code : 401,
        message : "Unauthorized user"
    },

    INVALID_CREDENTIALS : {
        code : 401,
        message : "The credentials are incorrect. Please verify and try again"
    },

    USER_ALREADY_EXIST : {
        code : 400,
        message : "User already registered. Please login"
    },

    UNREGISTERED_USER : {
        code: 400,
        message: "USER with given credential does not exists"
    },

    PASSWORD_CHANGE_FAILED: {
        code: 400,
        message: "Password change request failed. Try again later"
    }

}