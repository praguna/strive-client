export interface JwtResponse {
    user: {
        _id : string,
        username: string,
        email: string,
        password: string
    }
    token : string
    expires_in: Number
}