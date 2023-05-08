import CardsState from "../../../../../../../App/state/CardsState"
import GroupsState from "../../../../../../../App/state/GroupsState"
import LocalStorage from "../../../../../../../App/state/LocalStorage"
import { CardsAPI, GroupsAPI } from "../api/api"

export const PushData_Thunk = async () => {
    let PushDataThunk = new Promise(async (resolve, reject) => {
        LocalStorage.toggleLoading(true)
        try {
            if (GroupsState.createdGroups[0]) {
                let response = await GroupsAPI.addGroups(GroupsState.createdGroups)
                console.log(response)
                let unifyCards = new Promise((resolve, reject) => {
                    response.data.forEach((data: {groupID: number, initialGroupID: number}, index: any, array: any) => {
                        CardsState.unifyCardsGroupsIDs(data.initialGroupID, data.groupID)
                        GroupsState.unifyGroupsIDs(data.initialGroupID, data.groupID)
                        if(index === array.length -1) {resolve(undefined)}
                    })
                })
                await unifyCards
                GroupsState.clearController(4)
            }
            if (GroupsState.updatedGroups[0]) {
                await GroupsAPI.updateGroups(GroupsState.updatedGroups)
                GroupsState.clearController(6)
            }
            if (GroupsState.deletedGroups[0]) {
                await GroupsAPI.deleteGroups(GroupsState.deletedGroups)
                GroupsState.clearController(5)
            }
            if (CardsState.addedCards[0]) {
                let response = await CardsAPI.addCards(CardsState.addedCards)
                let unifyCards = new Promise((resolve, reject) => {
                    response.data.forEach((data: {initialCardID: number, cardID: number}, index: any, array: any) => {
                        CardsState.unifyCardsIDs(data.initialCardID, data.cardID)
                        if(index === array.length -1) {resolve(undefined)}
                    })
                })
                await unifyCards
                CardsState.clearController(1)
            }
            if (CardsState.changedCards[0]) {
                await CardsAPI.updateCards(CardsState.changedCards)
                CardsState.clearController(2)
            }
            if (CardsState.deletedCards[0]) {
                await CardsAPI.deleteCards(CardsState.deletedCards)
                CardsState.clearController(3)
            }
            LocalStorage.toggleLoading(false)
            resolve(undefined)
        } catch(e: any) {
            if(e.response.status === 403) {
                reject(new Error('Почта не подтверждена. Доступны не все функции'))
            }
        } finally {
            LocalStorage.toggleLoading(false)
        }
    })
    return PushDataThunk
}