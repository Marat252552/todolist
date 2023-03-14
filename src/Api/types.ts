import { AxiosResponse } from "axios";
import { U_T } from "../Components/Redux/ReduxTypes";

type Result_T = {
    status: number,
    data: {
        name: string,
        lastName: string,
        email: string,
        isActivated: boolean,
        AccessToken: string
    }
}

export type CardsAPI_T = {
    PullCards: PullCardsAPI_T,
    addCards: addCardsAPI_T,
    deleteCards: deleteCardsAPI_T,
    updateCards: updateCardsAPI_T
}
export type AuthAPI_T = {
    Login: LoginAPI_T,
    Logged: LoggedAPI_T,
    SignIn: SignInAPI_T,
    Logout: LogoutAPI_T,
    checkdupl: checkduplAPI_T
}
export type UsersAPI_T = {
    DeleteUser: DeleteUserAPI_T,
    GetUsers: GetUsersAPI_T
}

export type LoggedAPI_T = () => Promise<Result_T>
export type LoginAPI_T = (login: string, password: string, remember: boolean, captchaToken: string) => Promise<Result_T>
export type SignInAPI_T = (login: string, password: string, email: string, birtdate: any, name: string, lastName: string, phoneNumber: string, gender: number, captchaToken: string) => Promise<Result_T>
export type addCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number, data: {card: U_T["cardType"]}}>
export type PullCardsAPI_T = () => Promise<{status: number, data: Array<U_T["cardType"]>}>
export type LogoutAPI_T = () => Promise<{status: number}>
export type deleteCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number}>
export type updateCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number}>
export type DeleteUserAPI_T = () => Promise<{status: number, data: {message: string}}>
export type checkduplAPI_T = (value: string) => Promise<{status: number, data: {message: string}}>
export type GetUsersAPI_T = () => Promise<{status: number, data: Array<any>}>