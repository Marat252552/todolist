import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
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
export const PushData_Thunk = async (SetMessageError: any) => {
    LocalStorage.toggleLoading(true)
    try {
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
    } catch(e: any) {
        if(e.response.status === 403) {
            SetMessageError('Почта не подтверждена. Доступны не все функции')
        }
    } finally {
        LocalStorage.toggleLoading(false)
    }
}
export const ChangeCard_Thunk = (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean, SetMessageError: any) => {
    if(LocalStorage.isActivated === 0) {
        SetMessageError('Почта не подтверждена. Доступны не все функции')
    } else {
        LocalStorage.changeCard(cardID, text, groupsIDs, isCompleted)
        LocalStorage.updateCurrentCards()
    }
}
export const SwitchCompleteCard_Thunk = (cardID: number, SetMessageError: any) => {
    if(!LocalStorage.isActivated) {
        return SetMessageError('Почта не подтверждена. Доступны не все функции')
    }
    LocalStorage.switchCompleteCard(cardID)
    LocalStorage.updateCurrentCards()
}
export const DeleteCard_Thunk = async (cardID: number, SetMessageError: any) => {
    if(!LocalStorage.isActivated) {
        return SetMessageError('Почта не подтверждена. Доступны не все функции')
    }
    LocalStorage.deleteCard(cardID)
    LocalStorage.updateCurrentCards()
}
export const AddCard_Thunk = (cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean, SetMessageError: any) => {
    if(!LocalStorage.isActivated) {
        return SetMessageError('Почта не подтверждена. Доступны не все функции')
    }
    LocalStorage.addNewCard(cardID, text, groupsIDs, isCompleted)
    LocalStorage.updateCurrentCards()
}
export const SwitchCardGroup_Thunk = (groupID: number) => {
    LocalStorage.changeCurrentCardGroupID(groupID)
    LocalStorage.updateCurrentCards()
}