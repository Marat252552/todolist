type Result_T = {
    status: number,
    data: {
        name: string,
        lastName: string,
        email: string,
        imgSRC: string,
        isActivated: number,
        AccessToken: string
    }
}


export type AuthAPI_T = {
    SignIn: SignInAPI_T,
    checkdupl: checkduplAPI_T
}
export type UsersAPI_T = {
    GetUsers: GetUsersAPI_T
}



export type SignInAPI_T = (login: string, password: string, email: string, birtdate: any, name: string, lastName: string, phoneNumber: string, gender: number, captchaToken: string) => Promise<Result_T>


export type checkduplAPI_T = (value: string) => Promise<{status: number, data: {message: string}}>
export type GetUsersAPI_T = () => Promise<{status: number, data: Array<any>}>