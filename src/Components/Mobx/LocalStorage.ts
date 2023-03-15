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
            { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'wallpaper1' },
            { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'wallpaper1' },
            { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'wallpaper1' },
            { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'wallpaper1' },
            { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'wallpaper1' },
        ],
        loading: false,
        addedCards: [] as Array<U_T["cardType"]>,
        changedCards: [] as Array<U_T["cardType"]>,
        deletedCards: [] as Array<U_T["cardType"]>,
        searchInputValue: '',
        isSearchOn: false,
        newCardID: 6 as number,
        allCards: [] as Array<U_T["cardType"]>,
        allCardGroups: [
            { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red' },
            { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
            { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'orange' },
            { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'blue' },
            { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
        ]
    }
    constructor() {
        makeAutoObservable(this)
    }
    // Используется для сохранения карточки с сервера
    setCard(cardID: number, text: string, groupsIDs: Array<number>, isCompleted: boolean) {
        let card = { cardID, text, groupsIDs, isCompleted }
        this.state.allCards.push(card)
    }
    changeCurrentCardGroupID(groupID: number) {
        let cardGroup = this.state.allCardGroups.filter(cardGroup => {
            return cardGroup.groupID === groupID
        })[0]
        this.state.currentCardGroup = cardGroup
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
    toggleLoading(value: boolean) {
        this.state.loading = value
    }
    clearController(controller: number) {
        if (controller === 1) { this.state.addedCards = [] }
        if (controller === 2) { this.state.changedCards = [] }
        if (controller === 3) { this.state.deletedCards = [] }
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