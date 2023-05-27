import { makeAutoObservable, toJS } from "mobx"
import { Group_T } from "../../Shared/Types/types"



class GroupsState {
    currentCardGroup = { _id: '1', name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' }
    menuCardGroups = [
        { _id: '1', name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
        { _id: '2', name: 'Важно', icon: 'StarOutlined', background: 'red' },
        { _id: '3', name: 'Запланировано', icon: 'CalendarOutlined', background: 'blue' },
        { _id: '4', name: 'Назначено мне', icon: 'UserOutlined', background: 'orange' },
        { _id: '5', name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
    ]
    createdGroups = [] as Array<Group_T>
    updatedGroups = [] as Array<Group_T>
    deletedGroups = [] as Array<Group_T>
    allCardGroups = [
        { _id: '1', name: 'Мой день', icon: 'DeploymentUnitOutlined', background: 'green' },
        { _id: '2', name: 'Важно', icon: 'StarOutlined', background: 'red' },
        { _id: '3', name: 'Запланировано', icon: 'CalendarOutlined', background: 'blue' },
        { _id: '4', name: 'Назначено мне', icon: 'UserOutlined', background: 'orange' },
        { _id: '5', name: 'Задачи', icon: 'HomeOutlined', background: 'blue' },
    ] as Array<Group_T>
    constructor() {
        makeAutoObservable(this)
    }
    setGroup(_id: string, name: string, icon: string, background: string) {
        let group = {_id, name, icon, background}
        console.log(toJS(this.allCardGroups) )
        this.allCardGroups = this.allCardGroups.filter(group => {
            return group._id !== _id
        })
        this.allCardGroups.push(group)
        console.log(toJS(this.allCardGroups) )
    }
    changeCurrentCardGroupID(_id: string) {
        let cardGroup = this.allCardGroups.filter(cardGroup => {
            return cardGroup._id === _id
        })[0]
        this.currentCardGroup = cardGroup
        console.log(toJS(cardGroup) )
    }
    clearAllGroups() {
        this.allCardGroups = []
    }
    clearController(controller: number) {
        if (controller === 4) { this.createdGroups = [] }
        if (controller === 5) { this.deletedGroups = [] }
        if (controller === 6) { this.updatedGroups = [] }
    }
    createNewGroup(_id: string, name: string, icon: string, background: string) {
        let newGroup = {_id, name, icon, background}
        this.createdGroups.push(newGroup)
        this.allCardGroups.push(newGroup)
    }
    deleteCardGroup(_id: string, name: string, icon: string, background: string) {
        let deletedGroup = {_id, name, icon, background}
        this.createdGroups = this.createdGroups.filter(group => _id !== group._id)
        this.allCardGroups = this.allCardGroups.filter(group => _id !== group._id)
        this.deletedGroups.push(deletedGroup)
    }
    updateCardGroup(_id: string, name: string, icon: string, background: string) {
        let updatedCardGroup = {_id, name, icon, background}
        this.allCardGroups = this.allCardGroups.map(cardGroup => {
            if(cardGroup._id === _id) {
                return updatedCardGroup
            } else {
                return cardGroup
            }
        })
        this.createdGroups = this.createdGroups.map(cardGroup => {
            if(cardGroup._id === _id) {
                return updatedCardGroup
            } else {
                return cardGroup
            }
        })
        this.updatedGroups.push(updatedCardGroup)
        console.log(toJS(this.updatedGroups) )
    }
    unifyGroupsIDs(initialGroupID: string, groupID: string) {
        let newUpdatedGroups = this.updatedGroups.map(cardGroup => {
            if(cardGroup._id === initialGroupID) {
                return {...cardGroup, groupID: groupID}
            } else {
                return {...cardGroup}
            }
        })
        this.updatedGroups = newUpdatedGroups
    }
}

export default new GroupsState()