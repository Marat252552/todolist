import { AC_cT, T_cT } from "../Redux/ReduxTypes"


export type BodyProps_T = {
    isAuthorized: boolean, 
    Login_AC: AC_cT["LoginAC_cT"],
    PullAllCardsThunk: T_cT["PullAllCardsThunk_cT"]
}