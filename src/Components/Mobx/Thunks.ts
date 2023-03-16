import { GroupsAPI } from './../../Api/Api';
import { CardsAPI } from "../../Api/Api"
import { U_T } from "../Redux/ReduxTypes"
import LocalStorage from "./LocalStorage"


export const PullAllCards_Thunk = async () => {
    try {
        LocalStorage.clearAllCards()
        let response = await CardsAPI.PullCards()
        if (response.status === 200) {
            let cards: Array<U_T["cardType"]> = response.data as Array<U_T["cardType"]>
            cards.forEach(card => {
                LocalStorage.setCard(card.cardID, card.text, card.groupsIDs, card.isCompleted)
            })
            LocalStorage.updateCurrentCards()
        }
    } catch(e) {
        console.log(e)
    }
    
}
export const PullAllGroups_Thunk = async () => {
    try {
        let response = await GroupsAPI.pullGroups()
        if (response.status === 200) {
            let groups: Array<{groupID: number, name: string, icon: string, background: string}> = response.data
            groups.forEach(group => {
                LocalStorage.setGroup(group.groupID, group.name, group.icon, group.background)
            })
        }
    } catch(e) {
        console.log(e)
    }
    
}


export const PushData_Thunk = async () => {
    let PushDataThunk = new Promise(async (resolve, reject) => {
        LocalStorage.toggleLoading(true)
        try {
            if (LocalStorage.state.createdGroups[0]) {
                await GroupsAPI.addGroups(LocalStorage.state.createdGroups)
                LocalStorage.clearController(4)
            }
            if (LocalStorage.state.addedCards[0]) {
                await CardsAPI.addCards(LocalStorage.state.addedCards)
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
            LocalStorage.toggleLoading(false)
        }
    })
    return PushDataThunk
}
export const ChangeCard_Thunk = (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean, SetMessageError: any) => {
    let ChangeCard = new Promise((resolve, reject) => {
        if(LocalStorage.isActivated === 0) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        LocalStorage.changeCard(cardID, text, groupsIDs, isCompleted)
        LocalStorage.updateCurrentCards()
        resolve(undefined)
    })
    return ChangeCard
    
}
export const DeleteCard_Thunk = async (cardID: number) => {
    let DeleteCard = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        LocalStorage.deleteCard(cardID)
        LocalStorage.updateCurrentCards()
        resolve(undefined)
    })
    return DeleteCard
    
}
export const AddCard_Thunk = (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) => {
    let AddCard = new Promise(async (resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        LocalStorage.addNewCard(cardID, text, groupsIDs, isCompleted)
        LocalStorage.updateCurrentCards()
        resolve(undefined)
    })
    return AddCard
}

export const CreateGroup_Thunk = (groupID: number, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        LocalStorage.createNewGroup(groupID, name, icon, background)
        resolve(undefined)
    })
    return CreateGroup
}
export const SwitchCardGroup_Thunk = (groupID: number) => {
    LocalStorage.changeCurrentCardGroupID(groupID)
    LocalStorage.updateCurrentCards()
}