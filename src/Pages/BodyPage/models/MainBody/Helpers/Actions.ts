import GroupsState from "../../../../../App/state/GroupsState"
import LocalStorage from "../../../../../App/state/LocalStorage"
import { AddCard_Thunk, ChangeCard_Thunk, CreateGroup_Thunk, DeleteCardGroup_Thunk, DeleteCard_Thunk, UpdateGroup_Thunk } from './../Processes/Thunks'
import { Actions_T } from "./types"

const Actions: Actions_T = {
    addGroup: async (card, groupID) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = [...updatedCard.groupsIDs, groupID]
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed)
        } catch (e: any) {
            console.log(e)
        }
    },
    deleteGroup: async (card, _id) => {
        let updatedCard = { ...card }
        updatedCard.groupsIDs = updatedCard.groupsIDs.filter((ID: string) => { return ID !== _id })
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed)
        } catch (e: any) {
            console.log(e)
        }
    },
    completeCard: async (card) => {
        let updatedCard = { ...card }
        updatedCard.is_completed = true
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed)
        } catch (e: any) {
            console.log(e)
        }
    },
    incompleteCard: async (card) => {
        let updatedCard = { ...card }
        updatedCard.is_completed = false
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed)
        } catch (e: any) {
            console.log(e)
        }
    },
    deleteCard: async (_id) => {
        try {
            await DeleteCard_Thunk(_id)
        } catch (e: any) {
            console.log(e)
        }
    },
    addCard: async (content) => {
        try {
            if(GroupsState.currentCardGroup._id === '5') {
                await AddCard_Thunk(Date.now().toString(), content, [GroupsState.currentCardGroup._id], false)
            } else {
                await AddCard_Thunk(Date.now().toString(), content, ['5', GroupsState.currentCardGroup._id], false)
            }
        } catch (e: any) {
            console.log(e)
        }

    },
    changeCardText: async (card, content) => {
        let updatedCard = { ...card }
        updatedCard.content = content
        try {
            await ChangeCard_Thunk(updatedCard._id, updatedCard.content, updatedCard.groupsIDs, updatedCard.is_completed)
        } catch (e: any) {
            console.log(e)
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