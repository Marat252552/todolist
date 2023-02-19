export type MapStateType = {
    isSearchOn: boolean,
    searchInputValue: string,
    isAuthorized: boolean
}

export type MapDispatchType = {
    toggleSearch: (isSearchOn: boolean) => any,
    updateSearchInputValue: (text: string) => any,
    loginThunk: (login: string, password: string) => void,
    logoutThunk: () => void
}

export type SearchBoxPropsType = {
    toggleSearch: (isSearchOn: boolean) => any,
    searchInputValue: string,
    updateSearchInputValue: (text: string) => any
}

export type InfoBoxPropsType = {
    isAuthorized: boolean,
    loginThunk: (login: string, password: string) => void,
    logoutThunk: () => void
}

export type MainBoxPropsType = MapStateType & MapDispatchType