import { AC_cT, AC_T, AllActionsData, T_cT, T_T } from "./Redux/ReduxTypes"

export type PageProps_T = mapState_T & mapDispatch_T

export type mapState_T = {
}

export type mapDispatch_T = {
    pullAllCards_Thunk: T_cT["PullAllCardsThunk_cT"]
}