import { StarFilled, StarOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { DeleteCard_Thunk } from '../../../Mobx/Thunks'
import { U_T } from '../../../Redux/ReduxTypes'
import styles from './../MainBody.module.css'
import Actions from './Actions'

const LowComponent = {
    CheckBox: (props: { card: U_T["cardType"], stopPropagation: boolean, SetMessageError: (value: string) => void }) => {
        return <div className={styles.checkbox}>
            <input style={{ margin: '12px' }} type='checkbox' checked={props.card.isCompleted} id='chbox' onChange={() => {
                if (props.card.isCompleted) { Actions.incompleteCard(props.card, props.SetMessageError) } else { Actions.completeCard(props.card, props.SetMessageError) }
            }} onClick={e => e.stopPropagation()} />
        </div>
    },
    Block: ({ children }: any) => {
        return <div style={{ border: 'solid 1px rgb(215, 215, 215)', width: '100%', padding: '10px', borderRadius: '5px', margin: '40px 40px 40px 0' }}>
            {children}
        </div>
    },
    CardInfo: (props: { text: string, requiredGroupsArray: Array<string>, }) => {
        return <div className={styles.cardInfo}>
            <p>{props.text}</p>
            <span className={styles.groupName}>{props.requiredGroupsArray.map(groupName => {
                if (groupName !== 'Важно') {
                    return <span key={groupName}>{groupName} </span>
                }
            }
            )}</span>
        </div>
    },
    Buttons: {
        MyDay: (props: { groupsIDs: Array<number>, card: U_T["cardType"], SetMessageError: (value: string) => void }) => {
            if (props.groupsIDs.find(el => el === 1)) {
                return <Button type="default" onClick={() => { Actions.deleteGroup(props.card, 1, props.SetMessageError) }}>Убрать из представления Мой день</Button>
            } else {
                return <Button type="default" onClick={() => { Actions.addGroup(props.card, 1, props.SetMessageError) }}>Добавить в представление мой день</Button>
            }
        },
        Important: (props: {card: U_T["cardType"], SetMessageError: (value: string) => void }) => {
            return <div>
                {(props.card.groupsIDs.find(el => el === 2) !== undefined) ?
                    <Button className={styles.starButton} onClick={(e) => {
                        Actions.deleteGroup(props.card, 2, props.SetMessageError)
                        e.stopPropagation()
                    }} shape="circle">
                        <StarFilled />
                    </Button>
                    :
                    <Button className={styles.starButton} onClick={(e) => {
                        Actions.addGroup(props.card, 2, props.SetMessageError)
                        e.stopPropagation()
                    }} shape="circle">
                        <StarOutlined />
                    </Button>
                }
            </div>
        },
        DeleteCard: (props: { cardID: number, SetMessageError: (value: string) => void }) => {
            return <Button
                danger
                type='primary'
                style={{ width: '100%' }}
                onClick={() => { DeleteCard_Thunk(props.cardID, props.SetMessageError) }}>
                Delete
            </Button>
        }
    },

}

export default LowComponent