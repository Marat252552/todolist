import { AxiosResponse } from "axios";
import { U_T } from "../Components/Redux/ReduxTypes";

type Result_T = {
    status: number,
    data: {
        name: string,
        lastName: string,
        email: string,
        AccessToken: string
    }
}

export type LoggedAPI_T = () => Promise<Result_T>
export type LoginAPI_T = (login: string, password: string, remember: boolean, captchaToken: string) => Promise<Result_T>
export type SignInAPI_T = (login: string, password: string, email: string, birtdate: any, name: string, lastName: string, phoneNumber: string, gender: number, captchaToken: string) => Promise<Result_T>
export type addCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number, data: {card: U_T["cardType"]}}>
export type PullCardsAPI_T = () => Promise<{status: number, data: Array<U_T["cardType"]>}>
export type LogoutAPI_T = () => Promise<{status: number}>