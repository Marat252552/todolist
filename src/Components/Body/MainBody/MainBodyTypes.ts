import { cardGroupType, allCardGroupsType, addNewCardACType, deleteCardACType, changeCardACType } from './../../Redux/ReduxTypes';

export type MapStateType = {
    currentCardGroup: cardGroupType,
    allCardGroups: allCardGroupsType,
    background: string
}

export type mapDispatchType = {
    addNewCardAC: (text: string, groupID: number) => addNewCardACType,
    deleteCardAC: (cardID: number) => deleteCardACType,
    changeCardAC: (text: string, cardID: number) => changeCardACType
}

export type MainBodyPropsType = MapStateType & mapDispatchType

export type MakeCardPropsType = {
    key: number,
    cardID: number,
    text: string,
    deleteCardAC: (cardID: number) => void,
    changeCardAC: (text: string, cardID: number) => void,
    groupID: Array<number>,
    allCardGroups: allCardGroupsType,
    currentCardGroup: cardGroupType
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
