import { updateCardAPI } from './../../Api/Api';
import { Dispatch } from "react"
import { PullCardsAPI, LogoutAPI, LoginAPI } from "../../Api/Api"
import { clearAllCards_AC, addNewCard_AC, updateCurrentCards_AC, deleteCard_AC, changeCard_AC, changeCurrentCardGroupID_AC, addGroupID_AC, deleteGroupID_AC, switchCompleteCard_AC, Logout_AC, Login_AC } from "./ActionCreators"
import { T_T, AllActionsData, U_T } from "./ReduxTypes"
// active thunks
export const pullAllCards_Thunk: T_T["PullAllCardsThunk_T"] = () => {
    return async (dispatch: Dispatch<AllActionsData>) => {
        dispatch(clearAllCards_AC())
        let response = await PullCardsAPI()
        console.log(response)
        if(response.status === 200) {
            let cards: Array<U_T["cardType"]> = response.data as Array<U_T["cardType"]>
            cards.forEach(card => {
                dispatch(addNewCard_AC(card.cardID, card.text, card.groupsIDs, card.isCompleted))
            })
            dispatch(updateCurrentCards_AC())
        } else {
            console.log(response.status)
        }
        
    }
}
export const addNewCard_Thunk: T_T["addNewCardThunk_T"] = (id, text, groupsIDs, isCompleted) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(addNewCard_AC(id, text, groupsIDs, isCompleted))
        dispatch(updateCurrentCards_AC())
    }
}
export const deleteCard_Thunk: T_T["deleteCardThunk_T"] = (cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(deleteCard_AC(cardID))
        dispatch(updateCurrentCards_AC())
    }
}
export const login_Thunk: T_T["loginThunk_T"] = (login, password) => {
    return async (dispatch: Dispatch<AllActionsData>) => {
        try {
            let res = await LoginAPI(login, password)
            if(res.status === 200) {
                dispatch(Login_AC(res.data.email, res.data.name, res.data.lastName))
            }
        } catch(e) {
            console.log(e)
        }
    }
}
export const updateCard_Thunk = (card: U_T["cardType"]) => {
    return async (dispatch: Dispatch<AllActionsData>) => {
        try {
            let res = await updateCardAPI(card)
            if(res.status === 200) {
                dispatch(pullAllCards_Thunk() as any)
            }
        } catch(e) {
            console.log(e)
        }
    }
}

export const addGroupID_Thunk2 = (groupID: number, card: U_T["cardType"]) => {
    return async (dispatch: Dispatch<AllActionsData>) => {
        try {
            let updatedCard = card
            updatedCard.groupsIDs.push(groupID)
            updateCard_Thunk(updatedCard) as any
        } catch(e) {
            console.log(e)
        }
    }
}
export const deleteGroupID_Thunk2 = (DgroupID: number, card: U_T["cardType"]) => {
    return async (dispatch: Dispatch<AllActionsData>) => {
        try {
            let updatedCard = card
            updatedCard.groupsIDs.filter(groupID => {
                return groupID !== DgroupID
            })
            dispatch(updateCard_Thunk(updatedCard) as any)
        } catch(e) {
            console.log(e)
        }
    }
}




// not used thunks
export const changeCardThunk: T_T["changeCardThunk_T"] = (text: string, cardID: number) => {
    return (dispatch: Dispatch<AllActionsData>) => {
        dispatch(changeCard_AC(text, cardID))
        dispatch(updateCurrentCards_AC())
    }
}
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
export const logout_Thunk: T_T["logoutThunk_T"] = () => {
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