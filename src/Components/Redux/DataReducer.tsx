import { AllActionsData, U_T } from "./ReduxTypes"

export const ADD_NEW_CARD = 'ADD_NEW_CARD'
export const CLEAR_ALL_CARDS = 'CLEAR_ALL_CARDS'
export const DELETE_CARD = 'DELETE_CARD'
export const CHANGE_CARD = 'CHANGE_CARD'
export const CHANGE_CURRENT_GROUP_ID = 'CHANGE_CURRENT_CARD_GROUP_ID'
export const UPDATE_CURRENT_CARDS = 'UPDATE_CURRENT_CARDS'
export const ADD_GROUP_ID = 'ADD_GROUP_ID'
export const DELETE_GROUP_ID = 'DELETE_GROUP_ID'
export const SWITCH_COMPLETE_CARD = 'SWITCH_COMPLETE_CARD'
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH'
export const UPDATE_SEARCH_INPUT_VALUE = 'SEARCH_INPUT_VALUE'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


const initialState = {
    isAuthorized: false,
    email: '',
    login: '',
    name: '',
    lastName: '',
    currentCardGroup: { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
    currentCards: [
    ] as any,
    menuCardGroups: [
        { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'wallpaper1' },
        { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'wallpaper1' },
        { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'wallpaper1' },
        { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'wallpaper1' },
        { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'wallpaper1' },
    ],
    searchInputValue: '',
    isSearchOn: false,
    newCardID: 6 as number,
    allCards: [] as Array<U_T["cardType"]>,
    token: '',
    allCardGroups: [
        { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red' },
        { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
        { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'orange' },
        { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'blue' },
        { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
    ]
}

const DataReducer = (state = initialState, action: AllActionsData) => {
    switch (action.type) {
        case ADD_NEW_CARD: {
            // 2.Создаем карточку
            let card = { cardID: action.id, text: action.text, groupsIDs: action.groupsIDs, isCompleted: action.isCompleted }
            // 3.Добавляем в state allCards
            return {
                ...state,
                allCards: [
                    ...state.allCards,
                    card
                ]
            }
        }
        case CLEAR_ALL_CARDS: {
            return {
                ...state,
                allCards: [],
                currentCards: []
            }
        }
        case SWITCH_COMPLETE_CARD: {
            let updatedCardIndex = state.allCards.findIndex(el => el.cardID === action.cardID)
            let updatedCard = state.allCards[updatedCardIndex]
            let updatedAllCards = state.allCards
            if (state.allCards[updatedCardIndex].isCompleted === true) {
                updatedCard.isCompleted = false
            } else {
                updatedCard.isCompleted = true
            }
            updatedAllCards[updatedCardIndex] = updatedCard
            return {
                ...state,
                allCards: updatedAllCards
            }
        }
        case TOGGLE_SEARCH: {
            return {
                ...state,
                isSearchOn: action.isSearchOn
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
        case ADD_GROUP_ID: {
            let cardIndex = state.allCards.findIndex(el => el.cardID === action.cardID)
            let card = state.allCards[cardIndex]
            card.groupsIDs = [
                ...card.groupsIDs,
                action.groupID
            ]
            let newAllCards = [...state.allCards]
            newAllCards[cardIndex] = card
            return {
                ...state,
                allCards: newAllCards
            }
        }
        case DELETE_GROUP_ID: {
            let cardIndex = state.allCards.findIndex(el => el.cardID === action.cardID)
            let card = state.allCards[cardIndex]
            card.groupsIDs = card.groupsIDs.filter(groupID => {
                return groupID !== action.groupID
            })
            let newAllCards = [...state.allCards]
            newAllCards[cardIndex] = card
            return {
                ...state,
                allCards: newAllCards
            }
        }
        case CHANGE_CARD: {
            let findIndex = () => {
                let index = 0
                for (let i = 0; i < state.allCards.length; i++) {
                    if (state.allCards[i].cardID === action.cardID) {
                        index = i
                    }
                }
                return index
            }
            let cardIndex = findIndex()
            let newCard = { cardID: action.cardID, text: action.text, groupsIDs: state.allCards[cardIndex].groupsIDs, isCompleted: state.allCards[cardIndex].isCompleted }
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
        case UPDATE_SEARCH_INPUT_VALUE: {
            return {
                ...state,
                searchInputValue: action.text
            }
        }
        case LOGIN: {
            return {
                ...state,
                isAuthorized: true,
                name: action.name,
                lastName: action.lastName,
                email: action.email
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isAuthorized: false,
                login: '',
                email: '',
                allCards: [],
                currentCards: []
            }
        }
        default: {
            return state
        }
    }
}

export default DataReducer