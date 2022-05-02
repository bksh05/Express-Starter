import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';


/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export function validatePassword(password: string, hash: string, salt: string) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 */
export function generatePassword(password: string) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export function issueJWT(id: string) {
    const _id = id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, (process.env as any).SECRET, { expiresIn: expiresIn });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}


export function getServerResponse(success: boolean, body: any, error?: { code: number, message: string }): ServerResponse {
    const response = { success: success, body: body , error: error };
    return response;
}


export async function sendMail(to: string, subject: string, text?: string , html?: string){
    // TODO: send mail logic can be different for different user and hence left blank for the user of this code to fill.

    // Dummy response
    return true;
}
