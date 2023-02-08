import { menuCardGroupsType } from './../../../Redux/ReduxTypes';

export type CardsInfoPropsType = {
    changeCurrentCardGroupID: (groupID: number) => void,
    menuCardGroups: menuCardGroupsType
}

export type MakeMenuCardGroupPropsType = {
    key: number,
    name: string,
    groupID: number,
    icon: string,
    changeCurrentCardGroupID: (groupID: number) => void
}