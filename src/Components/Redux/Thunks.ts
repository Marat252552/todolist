import { addCardsAPI, deleteCardsAPI as deleteCardsAPI, updateCardAPI as updateCardsAPI } from './../../Api/Api';
import { Dispatch } from "react"
import { PullCardsAPI, LogoutAPI, LoginAPI } from "../../Api/Api"
import { clearAllCards_AC, addNewCard_AC, updateCurrentCards_AC, deleteCard_AC, changeTextCard_AC, changeCurrentCardGroupID_AC, addGroupID_AC, deleteGroupID_AC, switchCompleteCard_AC, Logout_AC, Login_AC, clearControllers, pullCards_AC, changeCard_AC } from "./ActionCreators"
import { T_T, AllActionsData, U_T, ControllersThunks_T, StateControllerThunks_T } from "./ReduxTypes"
import { AppStateType } from './Redux';

// Controller Thunks (directly work with API)
export const ControllerThunks: ControllersThunks_T = {
    // Pulls all cards from server to client and saves it in state.allCards
    pullAllCards_Thunk: () => {
        return async (dispatch: Dispatch<AllActionsData>) => {
            dispatch(clearAllCards_AC())
            let response = await PullCardsAPI()
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
        const syncAddedCards_Thunk: T_T["syncAddedCardsThunk_T"] = (state: AppStateType) => {
            return async (dispatch: Dispatch<AllActionsData>) => {
                try {
                    if (state.data.addedCards[0]) {
                        await addCardsAPI(state.data.addedCards)
                        dispatch(clearControllers(1))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
        const syncChangedCards_Thunk: T_T["syncChangedCardsThunk_T"] = (state: AppStateType) => {
            return async (dispatch: Dispatch<AllActionsData>) => {
                try {
                    if (state.data.changedCards[0]) {
                        await updateCardsAPI(state.data.changedCards)
                        dispatch(clearControllers(2))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
        const syncDeletedCards_Thunk: T_T["syncDeletedCardsThunk_T"] = (state: AppStateType) => {
            return async (dispatch: Dispatch<AllActionsData>) => {
                try {
                    if (state.data.deletedCards[0]) {
                        await deleteCardsAPI(state.data.deletedCards)
                        dispatch(clearControllers(3))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
        return async (dispatch: Dispatch<AllActionsData>) => {
            dispatch(syncAddedCards_Thunk(state) as any)
            dispatch(syncChangedCards_Thunk(state) as any)
            dispatch(syncDeletedCards_Thunk(state) as any)
        }
    },
    // Resolves logging in
    login_Thunk: (login, password) => {
        return async (dispatch: Dispatch<AllActionsData>) => {
            try {
                let res = await LoginAPI(login, password)
                if (res.status === 200) {
                    dispatch(Login_AC(res.data.email, res.data.name, res.data.lastName))
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    // Resolves logging out
    logout_Thunk: () => {
        return async (dispatch: Dispatch<AllActionsData>) => {
            try {
                let res = await LogoutAPI()
                if (res.status === 200) {
                    dispatch(Logout_AC())
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
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