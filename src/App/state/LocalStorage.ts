import { U_T } from "../../Shared/Types/typessss"
import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx'

class LocalStorage {
    AccessToken = ''
    Number = 0
    IsAuthorized = false
    userData = {
        name: '',
        lastName: '',
        email: '',
        imgSRC: ''
    }
    isActivated = false
    notedAboutActivated = true
    error = ''
    state = {
        currentCardGroup: { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
        currentCards: [
        ] as any,
        menuCardGroups: [
            { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
            { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red' },
            { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'blue' },
            { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'orange' },
            { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
        ],
        loading: false,
        addedCards: [] as Array<U_T["cardType"]>,
        changedCards: [] as Array<U_T["cardType"]>,
        deletedCards: [] as Array<U_T["cardType"]>,
        createdGroups: [] as Array<{groupID: number, name: string, icon: string, background: string}>,
        updatedGroups: [] as Array<{groupID: number, name: string, icon: string, background: string}>,
        deletedGroups: [] as Array<{groupID: number, name: string, icon: string, background: string}>,
        searchInputValue: '',
        isSearchOn: false,
        allCards: [] as Array<U_T["cardType"]>,
        allCardGroups: [
            { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
            { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red' },
            { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'blue' },
            { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'orange' },
            { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
        ] as Array<{groupID: number, name: string, icon: string, background: string}>
    }
    constructor() {
        makeAutoObservable(this)
    }
    setError(text: string) {
        this.error = text
    }
    // Используется для сохранения карточки с сервера
    setCard(id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) {
        let card = { id, content, groupsIDs, is_completed }
        this.state.allCards.push(card)
    }
    setGroup(groupID: number, name: string, icon: string, background: string) {
        let group = {groupID, name, icon, background}
        this.state.allCardGroups.push(group)
    }
    changeCurrentCardGroupID(groupID: number) {
        let cardGroup = this.state.allCardGroups.filter(cardGroup => {
            return cardGroup.groupID === groupID
        })[0]
        this.state.currentCardGroup = cardGroup
    }
    unifyCardsGroupsIDs(initialGroupID: number, groupID: number) {
        let newAddedCards = this.state.addedCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newChangedCards = this.state.changedCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newDeletedCards = this.state.deletedCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newAllCards = this.state.allCards.map((card: U_T["cardType"]) => {
            let unifiedCardGroups = card.groupsIDs.filter(oldGroupID => {return oldGroupID !== initialGroupID})
            unifiedCardGroups.push(groupID)
            console.log(unifiedCardGroups)
            return {...card, groupsIDs: unifiedCardGroups}
        })
        let newUpdatedGroups = this.state.updatedGroups.map(cardGroup => {
            if(cardGroup.groupID === initialGroupID) {
                return {...cardGroup, groupID: groupID}
            } else {
                return {...cardGroup}
            }
        })
        this.state.addedCards = newAddedCards
        this.state.changedCards = newChangedCards
        this.state.deletedCards = newDeletedCards
        this.state.allCards = newAllCards
        this.state.updatedGroups = newUpdatedGroups
    }
    unifyCardsIDs(initialCardID: number, cardID: number) {
        let newChangedCards = this.state.changedCards.map((card: U_T["cardType"]) => {
            if(card.id === initialCardID) {
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        let newDeletedCards = this.state.deletedCards.map((card: U_T["cardType"]) => {
            if(card.id === initialCardID) {
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        let newAllCards = this.state.allCards.map((card: U_T["cardType"]) => {
            if(card.id === initialCardID) {
                return {...card, id: cardID}
            } else {
                return card
            }
        })
        this.state.changedCards = newChangedCards
        this.state.deletedCards = newDeletedCards
        this.state.allCards = newAllCards
    }
    updateCurrentCards() {
        let newCurrentCards = this.state.allCards.filter(card => {
            return card.groupsIDs.includes(this.state.currentCardGroup.groupID)
        })
        this.state.currentCards = newCurrentCards
    }
    clearAllCards() {
        this.state.allCards = []
        this.state.currentCards = []
    }
    clearAllGroups() {
        this.state.allCardGroups = []
    }
    toggleLoading(value: boolean) {
        this.state.loading = value
        console.log(this.state.loading)
    }
    clearController(controller: number) {
        if (controller === 1) { this.state.addedCards = [] }
        if (controller === 2) { this.state.changedCards = [] }
        if (controller === 3) { this.state.deletedCards = [] }
        if (controller === 4) { this.state.createdGroups = [] }
        if (controller === 5) { this.state.deletedGroups = [] }
        if (controller === 6) { this.state.updatedGroups = [] }
    }
    switchCompleteCard(id: number) {
        let updatedCardIndex = this.state.allCards.findIndex(el => el.id === id)
        let updatedCard = this.state.allCards[updatedCardIndex]
        let updatedAllCards = this.state.allCards
        if (this.state.allCards[updatedCardIndex].is_completed === true) {
            updatedCard.is_completed = false
        } else {
            updatedCard.is_completed = true
        }
        updatedAllCards[updatedCardIndex] = updatedCard
        this.state.allCards = updatedAllCards
    }
    setIsActivated(value: boolean) {
        this.isActivated = value
    }
    addNewCard(id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) {
        let card = { id, content, groupsIDs, is_completed }
        this.state.allCards.push(card)
        this.state.addedCards.push(card)
    }
    changeCard(id: number, content: string, groupsIDs: Array<number>, is_completed: boolean) {
        let changedCard = { id, content, groupsIDs, is_completed }
        this.state.addedCards = this.state.addedCards.map(card => (card.id === changedCard.id)? changedCard : card)
        this.state.changedCards.push(changedCard)
        this.state.allCards = this.state.allCards.map(card => (card.id === changedCard.id)? changedCard : card )
        console.log(toJS(this.state.allCards) )
    }
    deleteCard(id: number) {
        let newAllCards = [
            ...this.state.allCards
        ]
        let deletedCard = this.state.allCards.find(card => card.id === id) as any
        newAllCards = newAllCards.filter(card => {
            return card.id !== deletedCard.id 
        })
        let newAddedCards = this.state.addedCards.filter(card => card.id !== id)
        let newChangedCards = this.state.changedCards.filter(card => card.id !== id)
        this.state.allCards = newAllCards
        this.state.deletedCards.push(deletedCard)
        this.state.addedCards = newAddedCards
        this.state.changedCards = newChangedCards
    }
    createNewGroup(groupID: number, name: string, icon: string, background: string) {
        let newGroup = {groupID, name, icon, background}
        this.state.createdGroups.push(newGroup)
        this.state.allCardGroups.push(newGroup)
    }
    deleteCardGroup(groupID: number, name: string, icon: string, background: string) {
        let deletedGroup = {groupID, name, icon, background}
        this.state.createdGroups = this.state.createdGroups.filter(group => groupID !== group.groupID)
        this.state.allCardGroups = this.state.allCardGroups.filter(group => groupID !== group.groupID)
        this.state.deletedGroups.push(deletedGroup)
    }
    setNotedAboutActivated(value: boolean) {
        this.notedAboutActivated = value
    }
    setUserData(name: string, lastName: string, email: string, imgSRC?: string) {
        this.userData.name = name
        this.userData.lastName = lastName
        this.userData.email = email
        if(!imgSRC) {
            this.userData.imgSRC = 'http://localhost:3000/default_user.jpg'
        }
        
    }
    setUserImgSRC(imgSRC: string) {
        this.userData.imgSRC = imgSRC
    }
    setToken(token: string) {
        this.AccessToken = token
    }
    setNumber(value: number) {
        this.Number = this.Number + value
    }
    setIsAuthorized(value: boolean) {
        this.IsAuthorized = value
    }
    // Changing option - icon, name или background
    updateCardGroup(groupID: number, name: string, icon: string, background: string) {
        let updatedCardGroup = {groupID, name, icon, background}
        this.state.allCardGroups = this.state.allCardGroups.map(cardGroup => {
            if(cardGroup.groupID === groupID) {
                return updatedCardGroup
            } else {
                return cardGroup
            }
        })
        this.state.createdGroups = this.state.createdGroups.map(cardGroup => {
            if(cardGroup.groupID === groupID) {
                return updatedCardGroup
            } else {
                return cardGroup
            }
        })
        this.state.updatedGroups.push(updatedCardGroup)
        console.log(toJS(this.state.updatedGroups) )
    }
}

export default new LocalStorage()