import { observer } from "mobx-react-lite"
import styles from './lib/styles.module.css'
import { Props_T } from "./lib/types"
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"

const CheckBox = observer((props: Props_T) => {
    return <div className={styles.mainContainer}>
        <input style={{ margin: '12px' }} type='checkbox' checked={props.card.is_completed} id='chbox' onChange={() => {
            if (props.card.is_completed) { Actions.incompleteCard(props.card) } else { Actions.completeCard(props.card) }
        }} onClick={e => e.stopPropagation()} />
    </div>
})

export default CheckBox