import { makeAutoObservable, toJS } from "mobx"
import { U_T } from "../../Shared/Types/typessss"
import LocalStorage from "./LocalStorage"
import GroupsState from "./GroupsState"

class CardsState {
    addedCards = [] as Array<U_T["cardType"]>
    changedCards = [] as Array<U_T["cardType"]>
    deletedCards = [] as Array<U_T["cardType"]>
    allCards = [] as Array<U_T["cardType"]>
    currentCards = [] as any
    constructor() {
        makeAutoObservable(this)
    }
    clearAllCards() {
        this.allCards = []
        this.currentCards = []
    }
    setCard(id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) {
        let card = { id, content, groupsIDs, is_completed }
        this.allCards.push(card)
    }
    unifyCardsIDs(initialCardID: number, cardID: number) {
        let newChangedCards = this.changedCards.map((card: U_T["cardType"]) => {
            console.log(card.id, initialCardID)
            if(card.id === initialCardID) {
                console.log({...card, id: cardID})
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        let newDeletedCards = this.deletedCards.map((card: U_T["cardType"]) => {
            if(card.id === initialCardID) {
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        let newAllCards = this.allCards.map((card: U_T["cardType"]) => {
            if(card.id === initialCardID) {
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        this.changedCards = newChangedCards
        this.deletedCards = newDeletedCards
        this.allCards = newAllCards
    }
    updateCurrentCards() {
        let newCurrentCards = this.allCards.filter(card => {
            return card.groupsIDs.includes(GroupsState.currentCardGroup.groupID)
        })
        this.currentCards = newCurrentCards
    }
    addNewCard(id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) {
        let card = { id, content, groupsIDs, is_completed }
        this.allCards.push(card)
        this.addedCards.push(card)
    }
    changeCard(id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) {
        let changedCard = { id, content, groupsIDs, is_completed }
        this.addedCards = this.addedCards.map(card => (card.id === changedCard.id)? changedCard : card)
        this.changedCards.push(changedCard)
        this.allCards = this.allCards.map(card => (card.id === changedCard.id)? changedCard : card )
        console.log(toJS(this.allCards) )
    }
    deleteCard(id: number) {
        let newAllCards = [
            ...this.allCards
        ]
        let deletedCard = this.allCards.find(card => card.id === id) as any
        newAllCards = newAllCards.filter(card => {
            return card.id !== deletedCard.id 
        })
        let newAddedCards = this.addedCards.filter(card => card.id !== id)
        let newChangedCards = this.changedCards.filter(card => card.id !== id)
        this.allCards = newAllCards
        this.deletedCards.push(deletedCard)
        this.addedCards = newAddedCards
        this.changedCards = newChangedCards
    }
    clearController(controller: number) {
        if (controller === 1) { this.addedCards = [] }
        if (controller === 2) { this.changedCards = [] }
        if (controller === 3) { this.deletedCards = [] }
    }
    unifyCardsGroupsIDs(initialGroupID: number, groupID: number) {
        let newAddedCards = this.addedCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newChangedCards = this.changedCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newDeletedCards = this.deletedCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newAllCards = this.allCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            console.log(unifiedCardGroups)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        this.addedCards = newAddedCards
        this.changedCards = newChangedCards
        this.deletedCards = newDeletedCards
        this.allCards = newAllCards
    }
}

export default new CardsState()