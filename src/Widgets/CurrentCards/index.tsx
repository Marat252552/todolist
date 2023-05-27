import { Card_T } from '../../Shared/Types/types'
import Card from '../Card'
import styles from './lib/styles.module.css'
import { Props_T } from './lib/types'


const CurrentCards = (props: Props_T) => {
    return <div className={styles.mainContainer} >
        {/* Невыполненные карточки */}
        {props.cards.incompletedCards.map((card: Card_T) => {
            return <Card key={card._id} setid={props.setid} showDrawer={props.showDrawer} card={card} />
        })}
        {/* Выполненные карточки */}
        {(props.cards.completedCards[0]) ?
            <span style={{ background: 'rgba(245, 245, 245, 0.8)', borderRadius: '2px', margin: '0 40px 5px 40px' }}>Выполненные задачи</span>
            :
            undefined
        }
        {props.cards.completedCards.map((card: Card_T) => {
            return <Card key={card._id} setid={props.setid} showDrawer={props.showDrawer} card={card} />
        })}
    </div>
}

export default CurrentCards