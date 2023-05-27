import { StarFilled, StarOutlined } from "@ant-design/icons"
import { Button } from "antd"
import styles from './lib/styles.module.css'
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"
import { Card_T } from "../../Shared/Types/types"

const ButtonImportant = (props: { card: Card_T }) => {
    return <div>
        {(props.card.groupsIDs.find(el => el === '2') !== undefined) ?
            <Button className={styles.starButton} onClick={(e) => {
                Actions.deleteGroup(props.card, '2')
                e.stopPropagation()
            }} shape="circle">
                <StarFilled />
            </Button>
            :
            <Button className={styles.starButton} onClick={(e) => {
                Actions.addGroup(props.card, '2')
                e.stopPropagation()
            }} shape="circle">
                <StarOutlined />
            </Button>
        }
    </div>
}

export default ButtonImportant