import LocalStorage from "../../../../Side/Mobx/LocalStorage"
import { AddCard_Thunk, ChangeCard_Thunk, CreateGroup_Thunk, DeleteCardGroup_Thunk, DeleteCard_Thunk, UpdateGroup_Thunk } from "../../../../Side/Mobx/Thunks"
import { U_T } from "../../../../Side/Redux/ReduxTypes"
import { Actions_T } from "./types"

const Actions: Actions_T = {
    addGroup: async (card, groupID, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = [...updatedCard.groupsIDs, groupID]
        try {
            await ChangeCard_Thunk(updatedCard.id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            SetMessageError(e.message)
        }
    },
    deleteGroup: async (card, groupID, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = updatedCard.groupsIDs.filter(ID => { return ID !== groupID })
        try {
            await ChangeCard_Thunk(updatedCard.id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            SetMessageError(e.message)
        }
    },
    completeCard: async (card, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.is_completed = true
        try {
            await ChangeCard_Thunk(updatedCard.id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            SetMessageError(e.message)
        }
    },
    incompleteCard: async (card, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.is_completed = false
        try {
            await ChangeCard_Thunk(updatedCard.id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            SetMessageError(e.message)
        }
    },
    deleteCard: async (id, SetMessageError, helper) => {
        try {
            await DeleteCard_Thunk(id)
            if (!helper) { return } helper()
        } catch (e: any) {
            SetMessageError(e.message)
        }
    },
    addCard: async (content, SetMessageError, helper) => {
        try {
            await AddCard_Thunk(Date.now(), content, [5, LocalStorage.state.currentCardGroup.groupID], false)
            helper()
        } catch (e: any) {
            SetMessageError(e.message)
        }

    },
    changeCardText: async (card, content, SetMessageError) => {
        let updatedCard = { ...card }
        updatedCard.content = content
        try {
            await ChangeCard_Thunk(updatedCard.id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            SetMessageError(e.message)
        }
    },
    createGroup: async (groupID, name, icon, background, SetMessageError) => {
        try {
            await CreateGroup_Thunk(groupID, name, icon, background)
        } catch(e: any) {
            SetMessageError(e.message)
        }
    },
    deleteCardGroup: async (groupID, name, icon, background, SetMessageError) => {
        try {
            await DeleteCardGroup_Thunk(groupID, name, icon, background)
        } catch(e: any) {
            SetMessageError(e.message)
        }
    },
    updateCardGroup: async (groupID, name, icon, background, SetMessageError) => {
        try {
            await UpdateGroup_Thunk(groupID, name, icon, background)
        } catch(e: any) {
            SetMessageError(e.message)
        }
    }
}

export default Actions