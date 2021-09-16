interface ServerResponse {
    error? : {
        code : number,
        message : string
    }
    body : any,
    success : boolean;

}