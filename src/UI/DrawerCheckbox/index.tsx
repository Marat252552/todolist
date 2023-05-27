import { Props_T } from "./lib/types"
import styles from './lib/styles.module.css'
import CardsState from "../../App/state/CardsState"
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"


const DrawerCheckBox = (props: Props_T) => {
    if (props.observableid === '') {
        return <div></div>
    }
    let card = CardsState.allCards.find(card => card._id === props.observableid)
    if (!card) {
        return <div></div>
    }
    return <div className={styles.checkbox}>
        <input style={{ margin: '12px' }} type='checkbox' checked={card?.is_completed} id='chbox' onChange={() => {
            if (card!.is_completed) { Actions.incompleteCard(card!) } else if (!card?.is_completed) { Actions.completeCard(card!) }
        }} />
    </div>
}

export default DrawerCheckBox