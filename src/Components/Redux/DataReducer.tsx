import { Dispatch } from "react"
import { AppStateType } from "./Redux"
import { addNewCardACType, AllActionsData, changeCardACType, changeCurrentCardGroupIDType, deleteCardACType, updateCurrentCardsType } from "./ReduxTypes"

export const ADD_NEW_CARD = 'ADD_NEW_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const CHANGE_CARD = 'CHANGE_CARD'
export const CHANGE_CURRENT_GROUP_ID = 'CHANGE_CURRENT_CARD_GROUP_ID'
export const UPDATE_CURRENT_CARDS = 'UPDATE_CURRENT_CARDS'

const initialState = {
    currentCardGroup: {groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green'},
    currentCards: [
    ] as any,
    menuCardGroups: [
        {groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'wallpaper1'},
        {groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'wallpaper1'},
        {groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'wallpaper1'},
        {groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'wallpaper1'},
        {groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'wallpaper1'},
    ],
    newCardID: 6 as number,
    allCards: [
        {cardID: 1, text: 'Выучить бананы', groupsIDs: [1, 2]},
        {cardID: 2, text: 'Выучить бананы', groupsIDs: [1, 2]}
    ],
    allCardGroups: [
        {groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red'},
        {groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green'},
        {groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'orange'},
        {groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'blue'},
        {groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue'},
    ]
}

const DataReducer = (state = initialState, action: AllActionsData) => {
    switch (action.type) {
        case ADD_NEW_CARD: {
            // 2.Создаем карточку
            let card = {cardID: state.newCardID, text: action.text, groupsIDs: [action.groupID]}
            // 3.Добавляем в state allCards и меняем newCardID
            return {
                ...state,
                newCardID: state.newCardID + 1,
                allCards: [
                    ...state.allCards,
                    card
                ]
            }
        }
        case DELETE_CARD: {
            let newAllCards = [
                ...state.allCards
            ]
            newAllCards = newAllCards.filter(card => {
                return card.cardID !== action.cardID
            })
            return {
                ...state,
                allCards: newAllCards
            }
        }
        case UPDATE_CURRENT_CARDS: {
            let newCurrentCards = state.allCards.filter(card => {
                return card.groupsIDs.includes(state.currentCardGroup.groupID)
            })
            return {
                ...state,
                currentCards: [...newCurrentCards]
            }
        }
        case CHANGE_CARD: {
            let findIndex = () => {
                let index = 0
                for(let i = 0; i<state.allCards.length; i++) {
                    if(state.allCards[i].cardID === action.cardID) {
                        index = i
                    }
                }
                return index
            }
            let cardIndex = findIndex()
            let newCard = {cardID: action.cardID, text: action.text, groupsIDs: state.allCards[cardIndex].groupsIDs}
            let newAllCards = state.allCards
            newAllCards[cardIndex] = newCard
            return {
                ...state,
                allCards: newAllCards
            }
        }
        case CHANGE_CURRENT_GROUP_ID: {
            // 1.Находим нужную группу и делаем ее копию
            let cardGroup = state.allCardGroups.filter(cardGroup => {
                return cardGroup.groupID === action.groupID
            })[0]
            return {
                ...state,
                currentCardGroup: cardGroup
            }
        }
        default: {
            return state
        }
    }
}

export const updateCurrentCards = (): updateCurrentCardsType => {
    return {
        type: UPDATE_CURRENT_CARDS
    }
}

export const addNewCardAC = (text: string, groupID: number): addNewCardACType => {
    return {
        type: ADD_NEW_CARD,
        text: text,
        groupID: groupID
    }
}

export const changeCardAC = (text: string, cardID: number): changeCardACType => {
    return {
        type: CHANGE_CARD,
        text: text,
        cardID: cardID
    }
}

export const deleteCardAC = (cardID: number): deleteCardACType => {
    return {
        type: DELETE_CARD,
        cardID: cardID
    }
}

export const changeCurrentCardGroupID = (groupID: number): changeCurrentCardGroupIDType => {
    return {
        type: CHANGE_CURRENT_GROUP_ID,
        groupID: groupID
    }
}

export const addNewCardThunk = (text: string, groupID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(addNewCardAC(text, groupID))
        dispatch(updateCurrentCards())
    }
}

export const deleteCardThunk = (cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(deleteCardAC(cardID))
        dispatch(updateCurrentCards())
    }
}

export const switchCardGroup = (groupID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(changeCurrentCardGroupID(groupID))
        dispatch(updateCurrentCards())
    }
}

export default DataReducer