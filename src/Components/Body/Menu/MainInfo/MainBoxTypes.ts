export type MapStateType = {
    isSearchOn: boolean
}

export type MapDispatchType = {
    toggleSearch: (isSearchOn: boolean) => any
}

export type SearchBoxPropsType = {
    toggleSearch: (isSearchOn: boolean) => any
}

export type MainBoxPropsType = MapStateType & MapDispatchType