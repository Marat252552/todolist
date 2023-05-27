import CardsState from "../../../../../../../App/state/CardsState"
import GroupsState from "../../../../../../../App/state/GroupsState"
import LocalStorage from "../../../../../../../App/state/LocalStorage"

export const SwitchCardGroup_Thunk = (_id: string) => {
    GroupsState.changeCurrentCardGroupID(_id)
    CardsState.updateCurrentCards()
}