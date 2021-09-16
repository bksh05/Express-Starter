/**
 * Overall types are defined here 
 * We can use this type to for proper type checking 
 * This file should be share in both UI and SERVER side
 * This will help to maintain proper type in both UI and SERVER code
 * Will give us proper autocomplete
 */
export default interface User {
    email : string,
    name : string,
    hash: string,
    salt: string,
    image: string
}