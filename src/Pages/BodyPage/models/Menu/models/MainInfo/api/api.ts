import { instanse } from "../../../../../../../Shared/Api/Api"
import { Card_T, Group_T } from "../../../../../../../Shared/Types/types"
import { CardsAPI_T, DeleteUserAPI_T, LogoutAPI_T, SetPhotoAPI_T } from "../lib/types"

export const SetPhotoAPI: SetPhotoAPI_T = async (formData: any) => {
    return instanse.post(`/auth/setphoto`, formData, {headers: {"Content-Type": "multipart/form-data"}})
}
export const DeleteUserAPI: DeleteUserAPI_T = async () => {
    console.log('DeleteUser request')
    let response = await instanse.delete('/users')
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const LogoutAPI: LogoutAPI_T = async () => {
    let response = await instanse.post('/auth/logout')
    let result = {
        status: response.status
    }
    return result
}
export const CardsAPI: CardsAPI_T = {
    addCards: async (cards) => {
        let response = await instanse.post(`/cards`, { cards })
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    deleteCards: (cards: Array<Card_T>) => {
        return instanse.post(`/cards/delete`, { cards })
    },
    updateCards: (cards: Array<Card_T>) => {
        return instanse.put(`/cards`, { cards })
    }
}
export const GroupsAPI = {
    addGroups: async (groups: Array<Group_T>) => {
        let response = await instanse.post('/groups', {groups: groups})
        return response
    },
    updateGroups: async (groups: Array<Group_T>) => {
        let response = await instanse.put('/groups', {groups: groups})
        return response
    },
    deleteGroups: async (groups: Array<Group_T>) => {
        console.log('delete groups api')
        let response = await instanse.put('/groups/delete', {groups: groups})
        return response
    },
}