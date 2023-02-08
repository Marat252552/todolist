import { changeCurrentCardGroupIDType, menuCardGroupsType } from "../../Redux/ReduxTypes"

export type MapStateType = {
    menuCardGroups: menuCardGroupsType
}

export type MapDispatchType = {
    changeCurrentCardGroupID: (groupID: number) => changeCurrentCardGroupIDType,
    switchCardGroup: (groupID: number) => void
}

export type MenuPropsType = {
    menuCardGroups: menuCardGroupsType,
    changeCurrentCardGroupID: (groupID: number) => void,
    switchCardGroup: (groupID: number) => void
}