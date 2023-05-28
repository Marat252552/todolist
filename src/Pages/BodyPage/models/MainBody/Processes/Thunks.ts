import { toJS } from "mobx"
import LocalStorage from "../../../../../App/state/LocalStorage"
import CardsState from "../../../../../App/state/CardsState"
import GroupsState from "../../../../../App/state/GroupsState"

export const ChangeCard_Thunk = (_id: string, content: string, groupsIDs: Array<string>, is_completed: boolean) => {
    let ChangeCard = new Promise((resolve, reject) => {
        if(LocalStorage.isActivated === false) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        CardsState.changeCard(_id, content, groupsIDs, is_completed)
        CardsState.updateCurrentCards()
        resolve(undefined)
    })
    return ChangeCard
}
export const DeleteCard_Thunk = async (_id: string) => {
    console.log(_id)
    let DeleteCard = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        CardsState.deleteCard(_id)
        CardsState.updateCurrentCards()
        resolve(undefined)
    })
    return DeleteCard
    
}
export const AddCard_Thunk = (_id: string, content: string, groupsIDs: Array<string>, is_completed: boolean) => {
    let AddCard = new Promise(async (resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        CardsState.addNewCard(_id, content, groupsIDs, is_completed)
        CardsState.updateCurrentCards()
        resolve(undefined)
    })
    return AddCard
}

export const CreateGroup_Thunk = (_id: string, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        GroupsState.createNewGroup(_id, name, icon, background)
        resolve(undefined)
    })
    return CreateGroup
}
export const DeleteCardGroup_Thunk = (_id: string, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        GroupsState.deleteCardGroup(_id, name, icon, background)
        let deletingCards = CardsState.allCards.filter(el => {
            if(el.groupsIDs.includes(_id)) {
                console.log('contains')
                return el
            }
        })
        console.log('deleting cards', deletingCards)
        if(deletingCards[0]) {
            deletingCards.forEach((el) => {
                DeleteCard_Thunk(el._id)
            })
        }
        resolve(undefined)
    })
    return CreateGroup
}
export const UpdateGroup_Thunk = (_id: string, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        GroupsState.updateCardGroup(_id, name, icon, background)
        resolve(undefined)
    })
    return CreateGroup
}
