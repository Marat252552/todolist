import LocalStorage from "../../../../../App/state/LocalStorage"

export const ChangeCard_Thunk = (id: number, content: string, groupsIDs: Array<number>, is_completed: boolean, SetMessageError: any) => {
    let ChangeCard = new Promise((resolve, reject) => {
        if(LocalStorage.isActivated === false) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        LocalStorage.changeCard(id, content, groupsIDs, is_completed)
        LocalStorage.updateCurrentCards()
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
        LocalStorage.deleteCard(id)
        LocalStorage.updateCurrentCards()
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
        LocalStorage.addNewCard(id, content, groupsIDs, is_completed)
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
export const DeleteCardGroup_Thunk = (groupID: number, name: string, icon: string, background: string) => {
    let CreateGroup = new Promise((resolve, reject) => {
        if(!LocalStorage.isActivated) {
            reject(new Error('Почта не подтверждена. Доступны не все функции'))
            return
        }
        LocalStorage.deleteCardGroup(groupID, name, icon, background)
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
        LocalStorage.updateCardGroup(groupID, name, icon, background)
        resolve(undefined)
    })
    return CreateGroup
}
