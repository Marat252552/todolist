import { toJS } from "mobx"
import LocalStorage from "../../../../../App/state/LocalStorage"
import CardsState from "../../../../../App/state/CardsState"
import GroupsState from "../../../../../App/state/GroupsState"

export const ChangeCard_Thunk = (id: number, content: string, groupsIDs: Array<number>, is_completed: boolean, SetMessageError: any) => {
    let ChangeCard = new Promise((resolve, reject) => {
        if(LocalStorage.isActivated === false) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        CardsState.changeCard(id, content, groupsIDs, is_completed)
        CardsState.updateCurrentCards()
        resolve(undefined)
    })
    return ChangeCard
}
export const DeleteCard_Thunk = async (id: number) => {
    let DeleteCard = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        CardsState.deleteCard(id)
        CardsState.updateCurrentCards()
        resolve(undefined)
    })
    return DeleteCard
    
}
export const AddCard_Thunk = (id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) => {
    let AddCard = new Promise(async (resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        CardsState.addNewCard(id, content, groupsIDs, is_completed)
        CardsState.updateCurrentCards()
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
        GroupsState.createNewGroup(groupID, name, icon, background)
        resolve(undefined)
    })
    return CreateGroup
}
export const DeleteCardGroup_Thunk = (groupID: number, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        GroupsState.deleteCardGroup(groupID, name, icon, background)
        let deletingCards = CardsState.allCards.filter(el => {
            if(el.groupsIDs.includes(groupID)) {
                console.log('contains')
                return el
            }
        })
        console.log('deleting cards', deletingCards)
        if(deletingCards[0]) {
            deletingCards.forEach((el) => {
                DeleteCard_Thunk(el.id)
            })
        }
        resolve(undefined)
    })
    return CreateGroup
}
export const UpdateGroup_Thunk = (groupID: number, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        GroupsState.updateCardGroup(groupID, name, icon, background)
        resolve(undefined)
    })
    return CreateGroup
}
