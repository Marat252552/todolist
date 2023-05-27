import { observer } from "mobx-react-lite"
import { Props_T } from "./lib/types"
import GroupsState from "../../App/state/GroupsState"
import styles from './lib/styles.module.css'
import { Popover } from "antd"
import CheckBox from "../../UI/CheckBox"
import ButtonDeleteCard from "../../UI/ButtonDeleteCard"
import ButtonMyDay from "../../UI/ButtonMyday"
import CompletedCardInfo from "../../UI/CompletedCardInfo"
import CardInfo from "../../UI/CardInfo"
import ButtonImportant from "../../UI/ButtonImportant"


const Card = observer((props: Props_T) => {
    // Массив со всеми группами карточки
    let requiredGroupsArray = props.card.groupsIDs.filter(groupID => {
        return groupID !== GroupsState.currentCardGroup.groupID
    }).map(groupID => {
        try {
            return GroupsState.allCardGroups.filter(group => { return groupID === group.groupID })[0]
        } catch (e) {
            return undefined
        }
    })
    if (requiredGroupsArray === undefined) {
        return <div></div>
    } else {
        return <>
        <div className={styles.MainContainer}>
        <Popover
                placement="bottomLeft"
                style={{ padding: '0', width: '40px' }}
                content={<div>
                    <ButtonDeleteCard _id={props.card._id} />
                    <ButtonMyDay card={props.card} groupsIDs={props.card.groupsIDs} />
                </div>
                }
                trigger="contextMenu">
                <div className={styles.card} onClick={() => {
                    props.showDrawer(props.card)
                }}>
                    <CheckBox card={props.card} stopPropagation={false} />
                    {(props.card.is_completed) ?
                        <CompletedCardInfo requiredGroupsArray={requiredGroupsArray!} content={props.card.content} />
                        :
                        <CardInfo requiredGroupsArray={requiredGroupsArray!} content={props.card.content} />
                    }
                    <ButtonImportant card={props.card} />
                </div>
            </Popover>
        </div>
            
        </>
    }
})

export default Card