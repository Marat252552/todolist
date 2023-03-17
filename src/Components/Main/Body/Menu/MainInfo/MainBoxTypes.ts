import { AppStateType } from '../../../../Side/Redux/Redux';
import { AC_cT, T_cT, T_T } from "../../../../Side/Redux/ReduxTypes"

export type MapStateType = {
    isSearchOn: boolean,
    searchInputValue: string,
    isAuthorized: boolean,
    name: string,
    lastName: string,
    email: string,
    state: AppStateType,
    loading: boolean
}

export type MapDispatchType = {
    toggleSearch_AC: AC_cT["toggleSearchAC_cT"],
    updateSearchInputValue_AC: AC_cT["updateSearchInputValueTypeAC_cT"],
    pullAllCards_Thunk: T_cT["PullAllCardsThunk_cT"],
    PushData_Thunk: T_cT["PushDataThunk_cT"]
}




export type MainBoxPropsType = MapStateType & MapDispatchType