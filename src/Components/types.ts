import { AC_cT, AC_T, AllActionsData, T_cT, T_T } from "./Redux/ReduxTypes"

export type PageProps_T = mapState_T & mapDispatch_T

export type mapState_T = {
    isAuthorized: boolean
}

export type mapDispatch_T = {
    Login_AC: AC_cT["LoginAC_cT"]
    pullAllCards_Thunk: T_cT["PullAllCardsThunk_cT"],
    login_Thunk: T_cT["loginThunk_cT"]
}