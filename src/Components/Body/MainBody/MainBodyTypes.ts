import { allCardGroupsType, addNewCardACType, deleteCardACType, changeCardACType, cardType, currentCardGroupType } from './../../Redux/ReduxTypes';

export type MapStateType = {
    currentCardGroup: currentCardGroupType,
    allCardGroups: allCardGroupsType,
    background: string,
    currentCards: Array<cardType>
}

export type mapDispatchType = {
    addNewCardThunk: (text: string, groupID: number) => any,
    addGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteCardThunk: (cardID: number) => any,
    changeCardThunk: (text: string, cardID: number) => any
}

export type MainBodyPropsType = MapStateType & mapDispatchType

export type MakeCardPropsType = {
    key: number,
    cardID: number,
    text: string,
    groupsIDs: Array<number>,
    allCardGroups: allCardGroupsType,
    currentCardGroup: currentCardGroupType,
    deleteGroupIDThunk: (groupID: number, cardID: number) => any,
    deleteCardThunk: (cardID: number) => any,
    addGroupIDThunk: (groupID: number, cardID: number) => any,
    changeCardThunk: (text: string, cardID: number) => any
}

export type CreateNewCardPropsType = {
    groupID: number,
    addNewCardThunk: (text: string, groupID: number) => any,
}

export type NewCardFormType = {
    groupID: number,
    addNewCardThunk: (text: string, groupID: number) => any,
}

export type ChangeCardFormType = {
    text: string,
    cardID: number,
    changeCardThunk: (text: string, cardID: number) => any
}
