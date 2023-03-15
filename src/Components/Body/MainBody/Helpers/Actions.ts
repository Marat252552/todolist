import { ChangeCard_Thunk } from "../../../Mobx/Thunks"
import { U_T } from "../../../Redux/ReduxTypes"
import { Actions_T } from "./types"

const Actions: Actions_T = {
    addGroup: async (card, groupID, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = [...updatedCard.groupsIDs, groupID]
        ChangeCard_Thunk(updatedCard.cardID, updatedCard.text, updatedCard.groupsIDs, updatedCard.isCompleted, SetMessageError)
    },
    deleteGroup: async (card, groupID, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = updatedCard.groupsIDs.filter(ID => { return ID !== groupID })
        ChangeCard_Thunk(updatedCard.cardID, updatedCard.text, updatedCard.groupsIDs, updatedCard.isCompleted, SetMessageError)
    },
    completeCard: async (card, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.isCompleted = true
        ChangeCard_Thunk(updatedCard.cardID, updatedCard.text, updatedCard.groupsIDs, updatedCard.isCompleted, SetMessageError)
    },
    incompleteCard: async (card, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.isCompleted = false
        ChangeCard_Thunk(updatedCard.cardID, updatedCard.text, updatedCard.groupsIDs, updatedCard.isCompleted, SetMessageError)
    }
}

export default Actions