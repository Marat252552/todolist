import { AC_cT, T_cT } from "../../../Redux/ReduxTypes"

export type MapStateType = {
    isSearchOn: boolean,
    searchInputValue: string,
    isAuthorized: boolean,
    name: string,
    lastName: string,
    email: string
}

export type MapDispatchType = {
    toggleSearch_AC: AC_cT["toggleSearchAC_cT"],
    updateSearchInputValue_AC: AC_cT["updateSearchInputValueTypeAC_cT"],
    logout_Thunk: T_cT["logoutThunk_cT"],
}

export type SearchBoxPropsType = {
    toggleSearch_AC: AC_cT["toggleSearchAC_cT"],
    searchInputValue: string,
    updateSearchInputValue_AC: AC_cT["updateSearchInputValueTypeAC_cT"]
}

export type InfoBoxPropsType = {
    isAuthorized: boolean,
    logout_Thunk: T_cT["logoutThunk_cT"],
    name: string,
    lastName: string,
    email: string
}

export type MainBoxPropsType = MapStateType & MapDispatchType