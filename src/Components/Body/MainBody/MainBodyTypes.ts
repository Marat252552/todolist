import { allCardGroupsType, addNewCardACType, deleteCardACType, changeCardACType, cardType, currentCardGroupType } from './../../Redux/ReduxTypes';

export type MapStateType = {
    currentCardGroup: currentCardGroupType,
    allCardGroups: allCardGroupsType,
    background: string,
    currentCards: Array<cardType>
}

export type mapDispatchType = {
    addNewCardAC: (text: string, groupID: number) => addNewCardACType,
    deleteCardAC: (cardID: number) => deleteCardACType,
    changeCardAC: (text: string, cardID: number) => changeCardACType,
    addNewCardThunk: (text: string, groupID: number) => any
}

export type MainBodyPropsType = MapStateType & mapDispatchType

export type MakeCardPropsType = {
    key: number,
    cardID: number,
    text: string,
    deleteCardAC: (cardID: number) => void,
    changeCardAC: (text: string, cardID: number) => void,
    groupsIDs: Array<number>,
    allCardGroups: allCardGroupsType,
    currentCardGroup: currentCardGroupType
}

export type CreateNewCardPropsType = {
    addNewCardAC: (text: string, groupID: number) => void,
    groupID: number
}

export type NewCardFormType = {
    addNewCardAC: (text: string, groupID: number) => void,
    groupID: number
}

export type ChangeCardFormType = {
    text: string,
    cardID: number,
    changeCardAC: (text: string, cardID: number) => void
}
