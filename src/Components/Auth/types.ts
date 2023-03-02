import { loginType } from './../Redux/ReduxTypes';
export type AuthPagePropsType = {
    isAuthorized: boolean,
    Login: (login: string, email: string, name: string, lastName: string) => loginType
}