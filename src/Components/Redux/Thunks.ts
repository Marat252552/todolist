import { useNavigate } from 'react-router-dom';
import {CardsAPI } from './../../Api/Api';
import { Dispatch } from "react"
import { clearAllCards_AC, addNewCard_AC, updateCurrentCards_AC, deleteCard_AC, changeTextCard_AC, changeCurrentCardGroupID_AC, addGroupID_AC, deleteGroupID_AC, switchCompleteCard_AC, Logout_AC, Login_AC, clearControllers, pullCards_AC, changeCard_AC, toggleLoading_AC } from "./ActionCreators"
import { T_T, AllActionsData, U_T, ControllersThunks_T, StateControllerThunks_T } from "./ReduxTypes"
import { AppStateType } from './Redux';
import LocalStorage from '../LocalStorage';


// Controller Thunks (directly work with API)
export const ControllerThunks: ControllersThunks_T = {
    // Pulls all cards from server to client and saves it in state.allCards
    pullAllCards_Thunk: () => {
        return async (dispatch: Dispatch<AllActionsData>) => {
            dispatch(clearAllCards_AC())
                let response = await CardsAPI.PullCards()
                if (response.status === 200) {
                    let cards: Array<U_T["cardType"]> = response.data as Array<U_T["cardType"]>
                    cards.forEach(card => {
                        dispatch(pullCards_AC(card.cardID, card.text, card.groupsIDs, card.isCompleted))
                    })
                    dispatch(updateCurrentCards_AC())
                } else {
                    console.log(response.status)
                }
            
        }
    },
    // Completes 3 different thunks in order to push new data to server
    PushData_Thunk: (state: AppStateType) => {
        return async (dispatch: Dispatch<AllActionsData>) => {
            dispatch(toggleLoading_AC(true))
            if (state.data.addedCards[0]) {
                await CardsAPI.addCards(state.data.addedCards)
                dispatch(clearControllers(1))
            }
            if (state.data.changedCards[0]) {
                await CardsAPI.updateCards(state.data.changedCards)
                dispatch(clearControllers(2))
            }
            if (state.data.deletedCards[0]) {
                await CardsAPI.deleteCards(state.data.deletedCards)
                dispatch(clearControllers(3))
            }
            dispatch(toggleLoading_AC(false))
        }
    },
}

// Thunks that help Controller Thunks (manage controller state - state.addedCards etc.)
export const StateControllerThunks: StateControllerThunks_T = {
    addCard_Thunk: (cardID, text, groupsIDs, isCompleted) => {
        return (dispatch: Dispatch<AllActionsData>) => {
            try {
                dispatch(addNewCard_AC(cardID, text, groupsIDs, isCompleted))
                dispatch(updateCurrentCards_AC())
            } catch (e) {
                console.log(e)
            }
        }
    },
    deleteCard_Thunk: (cardID: number) => {
        return (dispatch: Dispatch<AllActionsData>) => {
            try {
                dispatch(deleteCard_AC(cardID))
                dispatch(updateCurrentCards_AC())
            } catch (e) {
                console.log(e)
            }
        }
    },
    changeCard_Thunk: (cardID, text, groupsIDs, isCompleted) => {
        return (dispatch: Dispatch<AllActionsData>) => {
            try {
                dispatch(changeCard_AC(cardID, text, groupsIDs, isCompleted))
                dispatch(updateCurrentCards_AC())
            } catch (e) {
                console.log(e)
            }
        }
    }
}


// Not API Thunks
export const switchCardGroup_Thunk: T_T["switchCardGroupThunk_T"] = (groupID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(changeCurrentCardGroupID_AC(groupID))
        dispatch(updateCurrentCards_AC())
    }
}
export const addGroupID_Thunk: T_T["addGroupIDThunk_T"] = (groupID: number, cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(addGroupID_AC(groupID, cardID))
        dispatch(updateCurrentCards_AC())
    }
}
export const deleteGroupID_Thunk: T_T["deleteGroupIDThunk_T"] = (groupID: number, cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(deleteGroupID_AC(groupID, cardID))
        dispatch(updateCurrentCards_AC())
    }
}
export const switchCompleteCard_Thunk: T_T["switchCompleteCardThunk_T"] = (cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(switchCompleteCard_AC(cardID))
        dispatch(updateCurrentCards_AC())
    }
}