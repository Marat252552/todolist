import GroupsState from "../../../../../App/state/GroupsState"
import LocalStorage from "../../../../../App/state/LocalStorage"
import { AddCard_Thunk, ChangeCard_Thunk, CreateGroup_Thunk, DeleteCardGroup_Thunk, DeleteCard_Thunk, UpdateGroup_Thunk } from './../Processes/Thunks'
import { Actions_T } from "./types"

const Actions: Actions_T = {
    addGroup: async (card, groupID) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = [...updatedCard.groupsIDs, groupID]
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            console.log(e)
        }
    },
    deleteGroup: async (card, groupID) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = updatedCard.groupsIDs.filter((ID: number) => { return ID !== groupID })
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed, SetMessageError)
        } catch (e: any) {
            console.log(e)
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
            if(GroupsState.currentCardGroup.groupID === 5) {
                await AddCard_Thunk(Date.now(), content, [GroupsState.currentCardGroup.groupID], false)
                helper()
            } else {
                await AddCard_Thunk(Date.now(), content, [5, GroupsState.currentCardGroup.groupID], false)
                helper()
            }
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