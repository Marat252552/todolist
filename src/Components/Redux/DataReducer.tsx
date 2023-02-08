import { addNewCardACType, AllActionsData, changeCardACType, changeCurrentCardGroupIDType, deleteCardACType, updateCurrentCardsType } from "./ReduxTypes"

export const ADD_NEW_CARD = 'ADD_NEW_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const CHANGE_CARD = 'CHANGE_CARD'
export const CHANGE_CURRENT_GROUP_ID = 'CHANGE_CURRENT_CARD_GROUP_ID'
export const UPDATE_CURRENT_CARDS = 'UPDATE_CURRENT_CARDS'

const initialState = {
    currentCardGroup: {groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green', cards: []},
    currentCards: [],
    menuCardGroups: [
        {groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'wallpaper1'},
        {groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'wallpaper1'},
        {groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'wallpaper1'},
        {groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'wallpaper1'},
        {groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'wallpaper1'},
    ],
    newCardID: 6,
    allCardGroups: [
        {groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red'},
        {groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green'},
        {groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'orange'},
        {groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'blue'},
        {groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue'},
    ],
    allCards: [
        {cardID: 1, text: 'Сделать проект', groupsIDs: [1, 2]}
    ]
}

const DataReducer = (state = initialState, action: AllActionsData) => {
    switch (action.type) {
        case ADD_NEW_CARD: {
            // 1.Создаем копию текущей папки allCardGroups
            let newAllCardGroups = [...state.allCardGroups]
            // 2.Создаем карточку
            let card = {cardID: state.newCardID, text: action.text, groupsIDs: [action.groupID]}
            // 3.Добавляем в state allCards и меняем newCardID
            return {
                ...state,
                newCardID: state.newCardID + 1,
                allCards: [
                    ...state.allCards,
                    card
                ]
            }
        }
        case UPDATE_CURRENT_CARDS: {
            let currentCards = state.allCards.filter(card => {
                return card.groupsIDs.includes(state.currentCardGroup.groupID)
            })
            return {
                ...state,
                currentCards: currentCards
            }
        }
        case CHANGE_CARD: {
            // 1.Создаем копию группы, карточку которой будем менять
            let cardGroup = state.allCardGroups.filter(cardGroup => {
                return cardGroup.groupID === state.currentCardGroup.groupID
            })[0]
            // 2.Функция определяет порядковый номер карточки в указанной группе
            let getCardOrderNumber = (cardGroup: any) => {
                for(let i = 0; i<100; i++) {
                    if(cardGroup.cards[i].cardID === action.cardID) {
                        return i
                    }
                }
            }
            // 3.Функция определяет порядковый номер группы
            let getCardGroupOrderNumber = () => {
                for(let i = 0; i<100; i++) {
                    if(state.allCardGroups[i].groupID === state.currentCardGroup.groupID) {
                        return i
                    }
                }
            }
            // 4.1.Создаем копию нужной карточки
            let card = cardGroup.cards[getCardOrderNumber(cardGroup) as any]
            // 4.2.Создаем новую карточку на ее основe
            let newCard = {cardID: card.cardID, text: action.text, groupID: card.groupID}
            // 5.Создаем новую папку allCardGroups
            // 5.1.Создаем копию папки allCardGroups
            let allCardGroups = [...state.allCardGroups]
            // 5.2.Заменяем старую карточку новой в папке cardGroup
            cardGroup.cards[getCardOrderNumber(cardGroup) as any] = newCard
            // 5.3.Создаем новую группу карт
            let newCardGroup = {groupID: cardGroup.groupID, name: cardGroup.name, icon: cardGroup.icon, background: cardGroup.background,
                cards: [
                    ...cardGroup.cards
                ]}
            // 5.4.Заменяем старую группу карт на новую в папке allCardGroups
            allCardGroups[getCardGroupOrderNumber() as any] = newCardGroup
            console.log(allCardGroups)
            return {
                ...state,
                allCardGroups: allCardGroups
            }
        }
        case DELETE_CARD: {
            // 1..Создаем копию текущей папки allCardGroups
            let newAllCardGroups = [...state.allCardGroups]
            // 2.Изменяем в этой папке (allCardGroups) нужные группы карт по отдельности путем замены. Для каждой группы отдельный цикл
            // 2.1.Создаем цикл, в котором:
            for(let i = 0; i < state.allCardGroups.length; i++) {
                // 2.1.2.Находим нужную группу по порядковому номеру i
                let cardGroup = {...newAllCardGroups[i]}
                console.log(cardGroup)
                // 2.1.3.Фильтруем все карточки в cards и убираем изменяемую в данный момент карточку
                let cards = cardGroup.cards.filter(card => {return card.cardID !== action.cardID})
                // 2.1.4.Вставляем cards в cardGroup
                cardGroup.cards = [...cards]
                // 2.1.5.Заменяем старую группу новой в ранее созданной копии allCardGroups
                newAllCardGroups[i] = cardGroup
            }
            return {
                ...state,
                allCardGroups: newAllCardGroups
            }
        }
        case CHANGE_CURRENT_GROUP_ID: {
            // 1.Находим нужную группу и делаем ее копию
            let cardGroup = state.allCardGroups.filter(cardGroup => {
                return cardGroup.groupID === action.groupID
            })[0]
            return {
                ...state,
                currentCardGroup: cardGroup
            }
        }
        default: {
            return state
        }
    }
}

export const updateCurrentCards = (): updateCurrentCardsType => {
    return {
        type: 'UPDATE_CURRENT_CARDS'
    }
}

export const addNewCardAC = (text: string, groupID: number): addNewCardACType => {
    return {
        type: ADD_NEW_CARD,
        text: text,
        groupID: groupID
    }
}

export const changeCardAC = (text: string, cardID: number): changeCardACType => {
    return {
        type: CHANGE_CARD,
        text: text,
        cardID: cardID
    }
}

export const deleteCardAC = (cardID: number): deleteCardACType => {
    return {
        type: DELETE_CARD,
        cardID: cardID
    }
}

export const changeCurrentCardGroupID = (groupID: number): changeCurrentCardGroupIDType => {
    return {
        type: CHANGE_CURRENT_GROUP_ID,
        groupID: groupID
    }
}

export default DataReducer