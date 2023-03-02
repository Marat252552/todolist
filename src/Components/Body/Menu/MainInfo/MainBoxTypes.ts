export type MapStateType = {
    isSearchOn: boolean,
    searchInputValue: string,
    isAuthorized: boolean,
    name: string,
    lastName: string,
    email: string
}

export type MapDispatchType = {
    toggleSearch: (isSearchOn: boolean) => any,
    updateSearchInputValue: (text: string) => any,
    logoutThunk: () => void
}

export type SearchBoxPropsType = {
    toggleSearch: (isSearchOn: boolean) => any,
    searchInputValue: string,
    updateSearchInputValue: (text: string) => any
}

export type InfoBoxPropsType = {
    isAuthorized: boolean,
    logoutThunk: () => void,
    name: string,
    lastName: string,
    email: string
}

export type MainBoxPropsType = MapStateType & MapDispatchType