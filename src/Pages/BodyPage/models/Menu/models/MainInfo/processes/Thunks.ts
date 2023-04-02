import LocalStorage from "../../../../../../../App/state/LocalStorage"
import { CardsAPI, GroupsAPI } from "../api/api"

export const PushData_Thunk = async () => {
    let PushDataThunk = new Promise(async (resolve, reject) => {
        LocalStorage.toggleLoading(true)
        try {
            if (LocalStorage.state.createdGroups[0]) {
                let response = await GroupsAPI.addGroups(LocalStorage.state.createdGroups)
                console.log(response)
                let unifyCards = new Promise((resolve, reject) => {
                    response.data.forEach((data: {groupID: number, initialGroupID: number}, index: any, array: any) => {
                        LocalStorage.unifyCardsGroupsIDs(data.initialGroupID, data.groupID)
                        if(index === array.length -1) {resolve(undefined)}
                    })
                })
                await unifyCards
                LocalStorage.clearController(4)
            }
            if (LocalStorage.state.updatedGroups[0]) {
                await GroupsAPI.updateGroups(LocalStorage.state.updatedGroups)
                LocalStorage.clearController(6)
            }
            if (LocalStorage.state.deletedGroups[0]) {
                await GroupsAPI.deleteGroups(LocalStorage.state.deletedGroups)
                LocalStorage.clearController(5)
            }
            if (LocalStorage.state.addedCards[0]) {
                let response = await CardsAPI.addCards(LocalStorage.state.addedCards)
                let unifyCards = new Promise((resolve, reject) => {
                    response.data.forEach((data: {initialCardID: number, cardID: number}, index: any, array: any) => {
                        LocalStorage.unifyCardsIDs(data.initialCardID, data.cardID)
                        if(index === array.length -1) {resolve(undefined)}
                    })
                })
                await unifyCards
                LocalStorage.clearController(1)
            }
            if (LocalStorage.state.changedCards[0]) {
                await CardsAPI.updateCards(LocalStorage.state.changedCards)
                LocalStorage.clearController(2)
            }
            if (LocalStorage.state.deletedCards[0]) {
                await CardsAPI.deleteCards(LocalStorage.state.deletedCards)
                LocalStorage.clearController(3)
            }
            LocalStorage.toggleLoading(false)
            resolve(undefined)
        } catch(e: any) {
            if(e.response.status === 403) {
                reject(new Error('Почта не подтверждена. Доступны не все функции'))
            }
        } finally {
            console.log('oading finished')
            LocalStorage.toggleLoading(false)
        }
    })
    return PushDataThunk
}