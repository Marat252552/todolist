import { U_T } from './../Redux/ReduxTypes';
import { makeAutoObservable } from "mobx"
import { toJS } from 'mobx'

class LocalStorage {
    AccessToken = ''
    Number = 0
    IsAuthorized = false
    userData = {
        name: '',
        lastName: '',
        email: ''
    }
    isActivated = 0
    notedAboutActivated = true
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
        deletedGroups: [] as Array<{groupID: number, name: string, icon: string, background: string}>,
        searchInputValue: '',
        isSearchOn: false,
        newCardID: 6 as number,
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
    // Используется для сохранения карточки с сервера
    setCard(cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) {
        let card = { cardID, text, groupsIDs, isCompleted }
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
        this.state.addedCards = newAddedCards
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
    }
    clearController(controller: number) {
        if (controller === 1) { this.state.addedCards = [] }
        if (controller === 2) { this.state.changedCards = [] }
        if (controller === 3) { this.state.deletedCards = [] }
        if (controller === 4) { this.state.createdGroups = [] }
        if (controller === 5) { this.state.deletedGroups = [] }
    }
    switchCompleteCard(cardID: number) {
        let updatedCardIndex = this.state.allCards.findIndex(el => el.cardID === cardID)
        let updatedCard = this.state.allCards[updatedCardIndex]
        let updatedAllCards = this.state.allCards
        if (this.state.allCards[updatedCardIndex].isCompleted === true) {
            updatedCard.isCompleted = false
        } else {
            updatedCard.isCompleted = true
        }
        updatedAllCards[updatedCardIndex] = updatedCard
        this.state.allCards = updatedAllCards
    }
    setIsActivated(value: number) {
        this.isActivated = value
    }
    addNewCard(cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) {
        let card = { cardID, text, groupsIDs, isCompleted }
        this.state.allCards.push(card)
        this.state.addedCards.push(card)
    }
    changeCard(cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) {
        let changedCard = { cardID, text, groupsIDs, isCompleted }
        this.state.addedCards = this.state.addedCards.map(card => (card.cardID === changedCard.cardID)? changedCard : card)
        this.state.changedCards.push(changedCard)
        this.state.allCards = this.state.allCards.map(card => (card.cardID === changedCard.cardID)? changedCard : card )
        console.log(toJS(this.state.allCards) )
    }
    deleteCard(cardID: number) {
        let newAllCards = [
            ...this.state.allCards
        ]
        let deletedCard = this.state.allCards.find(card => card.cardID === cardID) as any
        newAllCards = newAllCards.filter(card => {
            return card.cardID !== deletedCard.cardID 
        })
        let newAddedCards = this.state.addedCards.filter(card => card.cardID !== cardID)
        let newChangedCards = this.state.changedCards.filter(card => card.cardID !== cardID)
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
    setUserData(name: string, lastName: string, email: string) {
        this.userData.name = name
        this.userData.lastName = lastName
        this.userData.email = email
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
}

export default new LocalStorage()