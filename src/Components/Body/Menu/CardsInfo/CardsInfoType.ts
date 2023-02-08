import { menuCardGroupsType } from './../../../Redux/ReduxTypes';

export type CardsInfoPropsType = {
    changeCurrentCardGroupID: (groupID: number) => void,
    menuCardGroups: menuCardGroupsType,
    switchCardGroup: (groupID: number) => void
}

export type MakeMenuCardGroupPropsType = {
    key: number,
    name: string,
    groupID: number,
    icon: string,
    changeCurrentCardGroupID: (groupID: number) => void,
    switchCardGroup: (groupID: number) => void
}