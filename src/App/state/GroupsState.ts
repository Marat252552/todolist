import { makeAutoObservable, toJS } from "mobx"



class GroupsState {
    currentCardGroup = { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' }
    menuCardGroups = [
        { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
        { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red' },
        { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'blue' },
        { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'orange' },
        { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
    ]
    createdGroups = [] as Array<{groupID: number, name: string, icon: string, background: string}>
    updatedGroups = [] as Array<{groupID: number, name: string, icon: string, background: string}>
    deletedGroups = [] as Array<{groupID: number, name: string, icon: string, background: string}>
    allCardGroups = [
        { groupID: 1, name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
        { groupID: 2, name: 'Важно', icon: 'StarOutlined', background: 'red' },
        { groupID: 3, name: 'Запланировано', icon: 'CalendarOutlined', background: 'blue' },
        { groupID: 4, name: 'Назначено мне', icon: 'UserOutlined', background: 'orange' },
        { groupID: 5, name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
    ] as Array<{groupID: number, name: string, icon: string, background: string}>
    constructor() {
        makeAutoObservable(this)
    }
    setGroup(groupID: number, name: string, icon: string, background: string) {
        let group = {groupID, name, icon, background}
        console.log(toJS(this.allCardGroups) )
        this.allCardGroups = this.allCardGroups.filter(group => {
            return group.groupID !== groupID
        })
        this.allCardGroups.push(group)
        console.log(toJS(this.allCardGroups) )
    }
    changeCurrentCardGroupID(groupID: number) {
        let cardGroup = this.allCardGroups.filter(cardGroup => {
            return cardGroup.groupID === groupID
        })[0]
        this.currentCardGroup = cardGroup
    }
    clearAllGroups() {
        this.allCardGroups = []
    }
    clearController(controller: number) {
        if (controller === 4) { this.createdGroups = [] }
        if (controller === 5) { this.deletedGroups = [] }
        if (controller === 6) { this.updatedGroups = [] }
    }
    createNewGroup(groupID: number, name: string, icon: string, background: string) {
        let newGroup = {groupID, name, icon, background}
        this.createdGroups.push(newGroup)
        this.allCardGroups.push(newGroup)
    }
    deleteCardGroup(groupID: number, name: string, icon: string, background: string) {
        let deletedGroup = {groupID, name, icon, background}
        this.createdGroups = this.createdGroups.filter(group => groupID !== group.groupID)
        this.allCardGroups = this.allCardGroups.filter(group => groupID !== group.groupID)
        this.deletedGroups.push(deletedGroup)
    }
    updateCardGroup(groupID: number, name: string, icon: string, background: string) {
        let updatedCardGroup = {groupID, name, icon, background}
        this.allCardGroups = this.allCardGroups.map(cardGroup => {
            if(cardGroup.groupID === groupID) {
                return updatedCardGroup
            } else {
                return cardGroup
            }
        })
        this.createdGroups = this.createdGroups.map(cardGroup => {
            if(cardGroup.groupID === groupID) {
                return updatedCardGroup
            } else {
                return cardGroup
            }
        })
        this.updatedGroups.push(updatedCardGroup)
        console.log(toJS(this.updatedGroups) )
    }
    unifyGroupsIDs(initialGroupID: number, groupID: number) {
        let newUpdatedGroups = this.updatedGroups.map(cardGroup => {
            if(cardGroup.groupID === initialGroupID) {
                return {...cardGroup, groupID: groupID}
            } else {
                return {...cardGroup}
            }
        })
        this.updatedGroups = newUpdatedGroups
    }
}

export default new GroupsState()