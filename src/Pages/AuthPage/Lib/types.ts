import { AC_cT, AC_T, T_cT } from '../../../Shared/Types/typessss';
export type AuthPagePropsType = {
    isAuthorized: boolean,
    Login_AC: AC_cT["LoginAC_cT"],
    login_Thunk: T_cT["loginThunk_cT"]
}

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

export type LoginAPI_T = (login: string, password: string, remember: boolean, captchaToken: string) => Promise<Result_T>