import { T_cT, U_T } from "../../Redux/ReduxTypes"


export type MapStateType = {
    currentCardGroup: U_T["currentCardGroup_T"] ,
    allCardGroups: U_T["allCardGroups_T"] ,
    background: string,
    currentCards: Array<U_T["cardType"]>,
    isSearchOn: boolean,
    allCards: Array<U_T["cardType"]>,
    searchInputValue: string
}

export type mapDispatchType = {
    addGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteCardThunk: (cardID: number) => any,
    switchCompleteCardThunk: (cardID: number) => any,
    PullAllCardsThunk: () => any,
    addCard_Thunk: (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => void,
    deleteCard_Thunk: (cardID: number) => void,
    changeCard_Thunk: (cardID: number, text: string, groupsIDs: number[], isCompleted: boolean) => void
}

export type MainBodyPropsType = MapStateType & mapDispatchType

export type MakeCardPropsType = {
    key: number,
    cardID: number,
    text: string,
    groupsIDs: Array<number>,
    isCompleted: boolean,
    card: U_T["cardType"],
    allCardGroups: U_T["allCardGroups_T"],
    currentCardGroup: U_T["currentCardGroup_T"],
    deleteGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteCardThunk: (cardID: number) => any,
    addGroupIDThunk: (groupID: number, cardID: number) => any,
    switchCompleteCardThunk: (cardID: number) => any,
    PullAllCardsThunk: () => any,
    deleteCard_Thunk: (cardID: number) => void,
    changeCard_Thunk: (cardID: number, text: string, groupsIDs: number[], isCompleted: boolean) => void
}

export type CreateNewCardPropsType = {
    groupID: number,
    currentCardGroup: U_T["currentCardGroup_T"],
    PullAllCardsThunk: () => any,
    addCard_Thunk: (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => void
}

export type NewCardFormType = {
    groupID: number,
    currentCardGroup: U_T["currentCardGroup_T"],
    PullAllCardsThunk: () => any,
    addCard_Thunk: (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => void
}

export type ChangeCardFormType = {
    text: string,
    cardID: number,
    isCompleted: boolean,
}
