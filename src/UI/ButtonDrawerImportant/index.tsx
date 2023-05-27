import { StarFilled, StarOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { toJS } from "mobx"
import CardsState from "../../App/state/CardsState"
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"
import styles from './lib/styles.module.css'

const DrawerImportant = (props: { observableid: string}) => {
    if (props.observableid === '') {
        return <div></div>
    }
    let card = toJS(CardsState.allCards.find(card => card._id === props.observableid))
    if (!card) {
        return <div></div>
    }
    return <div>
        {(card!.groupsIDs.find(el => el === '2') !== undefined) ?
            <Button className={styles.starButton} onClick={(e) => {
                Actions.deleteGroup(card!, '2')
                e.stopPropagation()
            }} shape="circle">
                <StarFilled />
            </Button>
            :
            <Button className={styles.starButton} onClick={(e) => {
                Actions.addGroup(card!, '2')
                e.stopPropagation()
            }} shape="circle">
                <StarOutlined />
            </Button>
        }
    </div>
}

export default DrawerImportant