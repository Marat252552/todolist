import { ADD_NEW_CARD, CHANGE_CARD, CHANGE_CURRENT_GROUP_ID, DELETE_CARD, UPDATE_CURRENT_CARDS } from "./DataReducer"

export type AllActionsData = addNewCardACType | changeCardACType | deleteCardACType | changeCurrentCardGroupIDType | updateCurrentCardsType

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

export type cardType = {cardID: number, text: string, groupsIDs: Array<number>}

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