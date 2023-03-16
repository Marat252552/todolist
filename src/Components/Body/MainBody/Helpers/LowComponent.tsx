import { CalendarOutlined, DeleteOutlined, DeploymentUnitOutlined, HomeOutlined, StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import LocalStorage from '../../../Mobx/LocalStorage'
import { DeleteCard_Thunk } from '../../../Mobx/Thunks'
import { U_T } from '../../../Redux/ReduxTypes'
import styles from './../MainBody.module.css'
import Actions from './Actions'
import HighComponent from './HighComponent'


const LowComponent = {
    CheckBox: observer((props: { card: U_T["cardType"], stopPropagation: boolean, SetMessageError: (value: string) => void }) => {
        return <div className={styles.checkbox}>
            <input style={{ margin: '12px' }} type='checkbox' checked={props.card.isCompleted} id='chbox' onChange={() => {
                if (props.card.isCompleted) { Actions.incompleteCard(props.card, props.SetMessageError) } else { Actions.completeCard(props.card, props.SetMessageError) }
            }} onClick={e => e.stopPropagation()} />
        </div>
    }),
    DrawerCheckBox: (props: { observableCardID: number, stopPropagation: boolean, SetMessageError: (value: string) => void }) => {
        if (props.observableCardID === 0) {
            return <div></div>
        }
        let card = toJS(LocalStorage.state.allCards.find(card => card.cardID === props.observableCardID))
        if (!card) {
            return <div></div>
        }
        return <div className={styles.checkbox}>
            <input style={{ margin: '12px' }} type='checkbox' checked={card?.isCompleted} id='chbox' onChange={() => {
                if (card!.isCompleted) { Actions.incompleteCard(card!, props.SetMessageError) } else if (!card?.isCompleted) { Actions.completeCard(card!, props.SetMessageError) }
            }} />
        </div>
    },
    Block: ({ children }: any) => {
        return <div style={{ border: 'solid 1px rgb(215, 215, 215)', width: '100%', borderRadius: '5px', margin: '40px 40px 40px 0' }}>
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
    DrawerCardInfo: (props: { observableCardID: number, SetMessageError: (value: any) => void }) => {
        if (props.observableCardID === 0) {
            return <div></div>
        }
        let card = toJS(LocalStorage.state.allCards.find(card => card.cardID === props.observableCardID))
        if (!card) {
            return <div></div>
        }
        let requiredGroupsArray = card!.groupsIDs.filter(groupID => {
            return groupID !== LocalStorage.state.currentCardGroup.groupID
        }).map(groupID => {
            return LocalStorage.state.allCardGroups.filter(group => { return groupID === group.groupID })[0].name
        })
        return <div className={styles.cardInfo}>
            <HighComponent.DrawerChangeCardForm card={card} SetMessageError={props.SetMessageError}/>
            <span className={styles.groupName}>{requiredGroupsArray.map(groupName => {
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
        DrawerMyDay: (props: { observableCardID: number, SetMessageError: (value: string) => void }) => {
            if (props.observableCardID === 0) {
                return <div></div>
            }
            let card = toJS(LocalStorage.state.allCards.find(card => card.cardID === props.observableCardID))
            if (!card) {
                return <div></div>
            }
            if (card!.groupsIDs.find(el => el === 1)) {
                return <Button style={{ width: '100%' }} icon={<DeploymentUnitOutlined style={{ fontSize: '18px', color: 'rgb(149, 188, 206)' }} />} type="default" onClick={() => { Actions.deleteGroup(card!, 1, props.SetMessageError) }}>Убрать из представления "Мой день"</Button>
            } else {
                return <Button style={{ width: '100%' }} icon={<DeploymentUnitOutlined style={{ fontSize: '18px', color: 'rgb(149, 188, 206)' }} />} type="default" onClick={() => { Actions.addGroup(card!, 1, props.SetMessageError) }}>Добавить в представление "Мой день"</Button>
            }
        },
        Important: (props: { card: U_T["cardType"], SetMessageError: (value: string) => void }) => {
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
        DrawerImportant: (props: { observableCardID: number, SetMessageError: (value: string) => void }) => {
            if (props.observableCardID === 0) {
                return <div></div>
            }
            let card = toJS(LocalStorage.state.allCards.find(card => card.cardID === props.observableCardID))
            if (!card) {
                return <div></div>
            }
            return <div>
                {(card!.groupsIDs.find(el => el === 2) !== undefined) ?
                    <Button className={styles.starButton} onClick={(e) => {
                        Actions.deleteGroup(card!, 2, props.SetMessageError)
                        e.stopPropagation()
                    }} shape="circle">
                        <StarFilled />
                    </Button>
                    :
                    <Button className={styles.starButton} onClick={(e) => {
                        Actions.addGroup(card!, 2, props.SetMessageError)
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
                onClick={async () => {
                    Actions.deleteCard(props.cardID, props.SetMessageError)
                }}>
                Delete
            </Button>
        },
        DrawerDeleteCard: (props: { observableCardID: number, SetMessageError: (value: string) => void, onClose: any }) => {
            return <Button icon={<DeleteOutlined />} onClick={async () => {
                Actions.deleteCard(props.observableCardID, props.SetMessageError, props.onClose)
            }}></Button>
        }
    },

}

export default LowComponent