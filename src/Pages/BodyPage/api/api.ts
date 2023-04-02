import { instanse } from "../../../Shared/Api/Api"

export const PullCardsAPI = async () => {
    let response = await instanse.get(`/cards`)
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}

export const PullGroupsAPI = async () => {
    let response = await instanse.get('/groups')
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}