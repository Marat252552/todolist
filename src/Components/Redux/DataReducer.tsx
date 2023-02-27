import { Dispatch } from "react"
import { LoggedAPI, LoginAPI, LogoutAPI, TestAPI } from "../../Api/Api"
import { AppStateType } from "./Redux"
import { addGroupIDType, addNewCardACType, AllActionsData, changeCardACType, changeCurrentCardGroupIDType, deleteCardACType, deleteGroupIDType, loginType, logoutType, switchCompleteCardType, toggleSearchType, updateCurrentCardsType, updateSearchInputValueType } from "./ReduxTypes"

export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const CHANGE_CARD = 'CHANGE_CARD';
export const CHANGE_CURRENT_GROUP_ID = 'CHANGE_CURRENT_CARD_GROUP_ID';
export const UPDATE_CURRENT_CARDS = 'UPDATE_CURRENT_CARDS';
export const ADD_GROUP_ID = 'ADD_GROUP_ID';
export const DELETE_GROUP_ID = 'DELETE_GROUP_ID';
export const SWITCH_COMPLETE_CARD = 'SWITCH_COMPLETE_CARD';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
export const UPDATE_SEARCH_INPUT_VALUE = 'SEARCH_INPUT_VALUE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = {
    isAuthorized: false,
    email: '',
    login: '',
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
    searchInputValue: '',
    isSearchOn: false,
    newCardID: 6 as number,
    allCards: [
        {cardID: 1, text: 'Выучить бананы', groupsIDs: [1, 2], isCompleted: false},
        {cardID: 2, text: 'Выучить бананы', groupsIDs: [1, 2], isCompleted: false}
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
            let card = {cardID: state.newCardID, text: action.text, groupsIDs: [action.groupID], isCompleted: false}
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
        case SWITCH_COMPLETE_CARD: {
            let updatedCardIndex = state.allCards.findIndex(el => el.cardID === action.cardID)
            let updatedCard = state.allCards[updatedCardIndex]
            let updatedAllCards = state.allCards
            if(state.allCards[updatedCardIndex].isCompleted === true) {
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
                for(let i = 0; i<state.allCards.length; i++) {
                    if(state.allCards[i].cardID === action.cardID) {
                        index = i
                    }
                }
                return index
            }
            let cardIndex = findIndex()
            let newCard = {cardID: action.cardID, text: action.text, groupsIDs: state.allCards[cardIndex].groupsIDs, isCompleted: state.allCards[cardIndex].isCompleted}
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
                login: action.login,
                email: action.email
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isAuthorized: false,
                login: '',
                email: ''
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

export const switchCompleteCard = (cardID: number): switchCompleteCardType => {
    return {
        type: SWITCH_COMPLETE_CARD,
        cardID: cardID
    }
}

export const changeCurrentCardGroupID = (groupID: number): changeCurrentCardGroupIDType => {
    return {
        type: CHANGE_CURRENT_GROUP_ID,
        groupID: groupID
    }
}

export const toggleSearch = (isSearchOn: boolean): toggleSearchType => {
    return {
        type: TOGGLE_SEARCH,
        isSearchOn: isSearchOn
    }
}

export const addGroupID = (groupID: number, cardID: number): addGroupIDType => {
    return {
        type: ADD_GROUP_ID,
        groupID: groupID,
        cardID: cardID
    }
}

export const deleteGroupID = (groupID: number, cardID: number): deleteGroupIDType => {
    return {
        type: DELETE_GROUP_ID,
        groupID: groupID,
        cardID: cardID
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

export const changeCardThunk = (text: string, cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(changeCardAC(text, cardID))
        dispatch(updateCurrentCards())
    }
}
export const switchCardGroup = (groupID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(changeCurrentCardGroupID(groupID))
        dispatch(updateCurrentCards())
    }
}
export const addGroupIDThunk = (groupID: number, cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(addGroupID(groupID, cardID))
        dispatch(updateCurrentCards())
    }
}
export const deleteGroupIDThunk = (groupID: number, cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(deleteGroupID(groupID, cardID))
        dispatch(updateCurrentCards())
    }
}
export const switchCompleteCardThunk = (cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(switchCompleteCard(cardID))
        dispatch(updateCurrentCards())
    }
}
export const updateSearchInputValue = (text: string): updateSearchInputValueType => {
    return {
        type: UPDATE_SEARCH_INPUT_VALUE,
        text: text
    }
}

export const Login = (login: string, email: string): loginType => {
    return {
        type: LOGIN,
        login: login,
        email: email
    }
}
export const loginThunk = (login: string, password: string) => {
    console.log(1)
    return async (dispatch: Dispatch<AllActionsData>) => {
        let res = await LoginAPI(login, password)
        console.log(res)
        dispatch(Login(res.data.login, res.data.email))
        // try{
        //     let res = await LoginAPI(login, password)
        //     dispatch(Login(res.data.login, res.data.email))
        //     console.log('ok')
        // } catch(e: any) {
        //     alert(e.response.status)
        // }
    }
}

const Logout = (): logoutType => {
    return {
        type: LOGOUT
    }
}
export const logoutThunk = () => {
    console.log(1)
    return async (dispatch: Dispatch<AllActionsData>) => {
        try{
            let res = await LogoutAPI()
            if(res.status === 201) {
                dispatch(Logout())
            } else {
                alert('some error')
            }
        } catch(e: any) {
            alert('error' + e.response.status)
        }
    }
}

export const authThunk = () => {
    return async (dispatch: any) => {
        try {
            let res = await LoggedAPI()
            if(+res === 200) {
                loginThunk('fea', 'dwa')
            }
        } catch(e) {
            console.log(e)
        }
    }
}

export default DataReducer