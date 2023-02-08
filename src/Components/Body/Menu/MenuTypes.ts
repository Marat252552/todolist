import { changeCurrentCardGroupIDType, menuCardGroupsType } from "../../Redux/ReduxTypes"

export type MapStateType = {
    menuCardGroups: menuCardGroupsType
}

export type MapDispatchType = {
    changeCurrentCardGroupID: (groupID: number) => changeCurrentCardGroupIDType
}

export type MenuPropsType = {
    menuCardGroups: menuCardGroupsType,
    changeCurrentCardGroupID: (groupID: number) => void
}