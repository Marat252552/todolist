import { AC_cT, T_cT, U_T } from "../../../Side/Redux/ReduxTypes"

export type MapStateType = {
    menuCardGroups: U_T["menuCardGroups_T"]
}

export type MapDispatchType = {
    changeCurrentCardGroupID_AC: AC_cT["changeCurrentCardGroupIDAC_cT"],
    switchCardGroup_Thunk: T_cT["switchCardGroupThunk_cT"]
}

export type MenuPropsType = MapStateType & MapDispatchType