import { AxiosResponse } from "axios";

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