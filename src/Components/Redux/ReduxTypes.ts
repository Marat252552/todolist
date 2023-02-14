import { ADD_GROUP_ID, ADD_NEW_CARD, CHANGE_CARD, CHANGE_CURRENT_GROUP_ID, DELETE_CARD, DELETE_GROUP_ID, SWITCH_COMPLETE_CARD, UPDATE_CURRENT_CARDS } from "./DataReducer"

export type AllActionsData = switchCompleteCard | addNewCardACType | changeCardACType | deleteCardACType | changeCurrentCardGroupIDType | updateCurrentCardsType | addGroupIDType | deleteGroupIDType

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