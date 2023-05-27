import { makeAutoObservable, toJS } from "mobx"
import GroupsState from "./GroupsState"
import { Card_T } from "../../Shared/Types/types"

class CardsState {
    addedCards = [] as Array<Card_T>
    changedCards = [] as Array<Card_T>
    deletedCards = [] as Array<Card_T>
    allCards = [] as Array<Card_T>
    currentCards = [] as any
    constructor() {
        makeAutoObservable(this)
    }
    clearAllCards() {
        this.allCards = []
        this.currentCards = []
    }
    setCard(_id: string, content: string, groupsIDs: Array<string>, is_completed: boolean) {
        let card = { _id, content, groupsIDs, is_completed }
        this.allCards.push(card)
    }
    unifyCardsIDs(initialCardID: string, cardID: string) {
        let newChangedCards = this.changedCards.map((card: Card_T) => {
            console.log(card._id, initialCardID)
            if(card._id === initialCardID) {
                console.log({...card, id: cardID})
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        let newDeletedCards = this.deletedCards.map((card: Card_T) => {
            if(card._id === initialCardID) {
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        let newAllCards = this.allCards.map((card: Card_T) => {
            if(card._id === initialCardID) {
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
            return card.groupsIDs.includes(GroupsState.currentCardGroup._id)
        })
        this.currentCards = newCurrentCards
    }
    addNewCard(_id: string, content: string, groupsIDs: Array<string>, is_completed: boolean) {
        let card = { _id, content, groupsIDs, is_completed }
        this.allCards.push(card)
        this.addedCards.push(card)
        console.log(toJS(this.allCards))
    }
    changeCard(_id: string, content: string, groupsIDs: Array<string>, is_completed: boolean) {
        let changedCard = { _id, content, groupsIDs, is_completed }
        this.addedCards = this.addedCards.map(card => (card._id === changedCard._id)? changedCard : card)
        this.changedCards.push(changedCard)
        this.allCards = this.allCards.map(card => (card._id === changedCard._id)? changedCard : card )
        console.log(toJS(this.allCards) )
    }
    deleteCard(_id: string) {
        console.log(_id)
        let newAllCards = [
            ...this.allCards
        ]
        let deletedCard = this.allCards.find(card => card._id === _id) as any
        newAllCards = newAllCards.filter(card => {
            return card._id !== deletedCard._id 
        })
        let newAddedCards = this.addedCards.filter(card => card._id !== _id)
        let newChangedCards = this.changedCards.filter(card => card._id !== _id)
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
    unifyCardsGroupsIDs(initialGroupID: string, _id: string) {
        let newAddedCards = this.addedCards.map((card: Card_T) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(_id)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newChangedCards = this.changedCards.map((card: Card_T) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(_id)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newDeletedCards = this.deletedCards.map((card: Card_T) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(_id)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newAllCards = this.allCards.map((card: Card_T) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(_id)
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