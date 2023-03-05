import { U_T } from "../../Redux/ReduxTypes"


export type MapStateType = {
    currentCardGroup: U_T["currentCardGroupType"] ,
    allCardGroups: U_T["allCardGroupsType"] ,
    background: string,
    currentCards: Array<U_T["cardType"]>,
    isSearchOn: boolean,
    allCards: Array<U_T["cardType"]>,
    searchInputValue: string
}

export type mapDispatchType = {
    addNewCardThunk: (id: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => any,
    addGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteCardThunk: (cardID: number) => any,
    changeCardThunk: (text: string, cardID: number) => any,
    switchCompleteCardThunk: (cardID: number) => any,
    PullAllCardsThunk: () => any
}

export type MainBodyPropsType = MapStateType & mapDispatchType

export type MakeCardPropsType = {
    key: number,
    cardID: number,
    text: string,
    groupsIDs: Array<number>,
    isCompleted: boolean,
    allCardGroups: U_T["allCardGroupsType"],
    currentCardGroup: U_T["currentCardGroupType"],
    deleteGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteCardThunk: (cardID: number) => any,
    addGroupIDThunk: (groupID: number, cardID: number) => any,
    changeCardThunk: (text: string, cardID: number) => any,
    switchCompleteCardThunk: (cardID: number) => any,
    PullAllCardsThunk: () => any
}

export type CreateNewCardPropsType = {
    groupID: number,
    currentCardGroup: U_T["currentCardGroupType"],
    addNewCardThunk: (id: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => any,
    PullAllCardsThunk: () => any
}

export type NewCardFormType = {
    groupID: number,
    currentCardGroup: U_T["currentCardGroupType"],
    addNewCardThunk: (id: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => any,
    PullAllCardsThunk: () => any
}

export type ChangeCardFormType = {
    text: string,
    cardID: number,
    isCompleted: boolean,
    changeCardThunk: (text: string, cardID: number) => any
}
