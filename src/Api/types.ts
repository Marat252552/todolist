import { AxiosResponse } from "axios";
import { U_T } from "../Components/Redux/ReduxTypes";

type Result_T = {
    status: number,
    data: {
        name: string,
        lastName: string,
        email: string
    }
}

export type LoggedAPI_T = () => Promise<Result_T>
export type LoginAPI_T = (login: string, password: string) => Promise<Result_T>
export type SignInAPI_T = (login: string, password: string, email: string, age: number, name: string, lastName: string) => Promise<Result_T>
export type addCardAPI_T = (text: string, groupID: string) => Promise<{status: number}>
export type PullCardsAPI_T = () => Promise<{status: number, data: Array<U_T["cardType"]>}>
export type LogoutAPI_T = () => Promise<{status: number}>