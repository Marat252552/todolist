import { toJS } from "mobx"
import CardsState from "../../App/state/CardsState"
import DrawerChangeCardForm from "../../Widgets/DrawerChangeCardForm"
import styles from './lib/styles.module.css'
import { Props_T } from "./lib/types"
import GroupsState from "../../App/state/GroupsState"

const DrawerCardInfo = (props: Props_T) => {
    if (props.observableid === '') {
        return <div></div>
    }
    let card = toJS(CardsState.allCards.find(card => card._id === props.observableid))
    if (!card) {
        return <div></div>
    }
    let requiredGroupsArray = card!.groupsIDs.filter(groupID => {
        return groupID !== GroupsState.currentCardGroup.groupID
    }).map(groupID => {
        return GroupsState.allCardGroups.filter(group => { return groupID === group.groupID })[0].name
    })
    return <div className={styles.cardInfo}>
        <DrawerChangeCardForm card={card} />
        <span className={styles.groupName}>{requiredGroupsArray.map(groupName => {
            if (groupName !== 'Важно') {
                return <span key={groupName}>{groupName} </span>
            }
        }
        )}</span>
    </div>
}

export default DrawerCardInfo