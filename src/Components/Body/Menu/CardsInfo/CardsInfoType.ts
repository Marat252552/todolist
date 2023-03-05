import { AC_cT, T_cT, U_T } from './../../../Redux/ReduxTypes';

export type CardsInfoPropsType = {
    changeCurrentCardGroupID_AC: AC_cT["changeCurrentCardGroupIDAC_cT"],
    menuCardGroups: U_T["menuCardGroups_T"],
    switchCardGroup_Thunk: T_cT["switchCardGroupThunk_cT"]
}

export type MakeMenuCardGroupPropsType = {
    key: number,
    name: string,
    groupID: number,
    icon: string,
    changeCurrentCardGroupID_AC: AC_cT["changeCurrentCardGroupIDAC_cT"],
    switchCardGroup_Thunk: T_cT["switchCardGroupThunk_cT"]
}