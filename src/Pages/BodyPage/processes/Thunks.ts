import CardsState from "../../../App/state/CardsState"
import GroupsState from "../../../App/state/GroupsState"
import { Card_T, Group_T } from "../../../Shared/Types/types"
import { PullCardsAPI, PullGroupsAPI } from "../api/api"

export const PullAllCards_Thunk = async () => {
    try {
        CardsState.clearAllCards()
        let response = await PullCardsAPI()
        if (response.status === 200) {
            let cards: Array<Card_T> = response.data as Array<Card_T>
            cards.forEach(card => {
                CardsState.setCard(card._id, card.content, card.groupsIDs, card.is_completed)
            })
            CardsState.updateCurrentCards()
        }
    } catch(e) {
        console.log(e)
    }
    
}
export const PullAllGroups_Thunk = async () => {
    try {
        let response = await PullGroupsAPI()
        if (response.status === 200) {
            let groups: Array<Group_T> = response.data
            groups.forEach(group => {
                GroupsState.setGroup(group._id, group.name, group.icon, group.background)
            })
        }
    } catch(e) {
        console.log(e)
    }
    
}