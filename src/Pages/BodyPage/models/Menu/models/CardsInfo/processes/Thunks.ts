import LocalStorage from "../../../../../../../App/state/LocalStorage"

export const SwitchCardGroup_Thunk = (groupID: number) => {
    LocalStorage.changeCurrentCardGroupID(groupID)
    LocalStorage.updateCurrentCards()
}