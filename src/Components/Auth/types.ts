import { AC_cT, AC_T, T_cT } from './../Redux/ReduxTypes';
export type AuthPagePropsType = {
    isAuthorized: boolean,
    Login_AC: AC_cT["LoginAC_cT"],
    login_Thunk: T_cT["login_Thunk"]
}