export type MapStateType = {
    isSearchOn: boolean,
    searchInputValue: string
}

export type MapDispatchType = {
    toggleSearch: (isSearchOn: boolean) => any,
    updateSearchInputValue: (text: string) => any
}

export type SearchBoxPropsType = {
    toggleSearch: (isSearchOn: boolean) => any,
    searchInputValue: string,
    updateSearchInputValue: (text: string) => any
}

export type MainBoxPropsType = MapStateType & MapDispatchType