import CardsState from "../../../App/state/CardsState"
import GroupsState from "../../../App/state/GroupsState"
import LocalStorage from "../../../App/state/LocalStorage"
import { U_T } from "../../../Shared/Types/typessss"
import { PullCardsAPI, PullGroupsAPI } from "../api/api"

export const PullAllCards_Thunk = async () => {
    try {
        CardsState.clearAllCards()
        let response = await PullCardsAPI()
        if (response.status === 200) {
            let cards: Array<U_T["cardType"]> = response.data as Array<U_T["cardType"]>
            cards.forEach(card => {
                CardsState.setCard(card.id, card.content, card.groupsIDs, card.is_completed)
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
            let groups: Array<{id: number, name: string, icon: string, background: string}> = response.data
            groups.forEach(group => {
                GroupsState.setGroup(group.id, group.name, group.icon, group.background)
            })
        }
    } catch(e) {
        console.log(e)
    }
    
}