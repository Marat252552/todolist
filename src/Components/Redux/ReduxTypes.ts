import { ADD_GROUP_ID, ADD_NEW_CARD, CHANGE_CARD, CHANGE_CURRENT_GROUP_ID, DELETE_CARD, DELETE_GROUP_ID, LOGIN, LOGOUT, SWITCH_COMPLETE_CARD, TOGGLE_SEARCH, UPDATE_CURRENT_CARDS, UPDATE_SEARCH_INPUT_VALUE } from "./DataReducer"

export type AllActionsData = logoutType | switchCompleteCard | addNewCardACType | changeCardACType | deleteCardACType | changeCurrentCardGroupIDType | updateCurrentCardsType | addGroupIDType | deleteGroupIDType | switchCompleteCardType | toggleSearchType | updateSearchInputValueType | loginType

export type addNewCardACType = {
    type: typeof ADD_NEW_CARD,
    text: string,
    groupID: number
}

export type changeCardACType = {
    type: typeof CHANGE_CARD,
    text: string,
    cardID: number
}

export type toggleSearchType = {
    type: typeof TOGGLE_SEARCH,
    isSearchOn: boolean
}

export type updateCurrentCardsType = {
    type: typeof UPDATE_CURRENT_CARDS
}

export type deleteCardACType = {
    type: typeof DELETE_CARD,
    cardID: number
}

export type changeCurrentCardGroupIDType = {
    type: typeof CHANGE_CURRENT_GROUP_ID,
    groupID: number
}

export type switchCompleteCardType = {
    type: typeof SWITCH_COMPLETE_CARD,
    cardID: number
}

export type addGroupIDType = {
    type: typeof ADD_GROUP_ID,
    groupID: number,
    cardID: number
}

export type deleteGroupIDType = {
    type: typeof DELETE_GROUP_ID,
    groupID: number,
    cardID: number
}

export type switchCompleteCard = {
    type: typeof SWITCH_COMPLETE_CARD,
    cardID: number
}

export type updateSearchInputValueType = {
    type: typeof UPDATE_SEARCH_INPUT_VALUE,
    text: string
}

export type loginType = {
    type: typeof LOGIN,
    login: string,
    email: string
}

export type logoutType = {
    type: typeof LOGOUT
}



export type cardType = {cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean}

export type cardGroupType = {
    groupID: number,
    name: string,
    background: string,
    icon: string
}

export type menuCardGroupType = {
    groupID: number,
    name: string,
    background: string,
    icon: string
}



export type currentCardGroupType = menuCardGroupType

export type allCardGroupsType = Array<cardGroupType>

export type menuCardGroupsType = Array<menuCardGroupType>