import { connect } from "react-redux";
import styles from './MainBody.module.css'
import { Checkbox, Popconfirm, Popover, Button } from "antd";
import { PlusOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import {useEffect} from "react";
import { Field, Formik, FormikProvider, useFormik } from "formik";
import { AppStateType } from "../../Redux/Redux";
import { ChangeCardFormType, CreateNewCardPropsType, MainBodyPropsType, MakeCardPropsType, mapDispatchType, MapStateType, NewCardFormType } from "./MainBodyTypes";
import { StateControllerThunks, addGroupID_Thunk, deleteGroupID_Thunk, switchCompleteCard_Thunk, ControllerThunks } from "../../Redux/Thunks";
import { U_T } from "../../Redux/ReduxTypes";
import { ModalWindow } from "../../Modal/Modal";
import LocalStorage from "../../Mobx/LocalStorage";
import { observer } from "mobx-react-lite";
import { AddCard_Thunk, ChangeCard_Thunk, DeleteCard_Thunk, SwitchCompleteCard_Thunk } from "../../Mobx/Thunks";
import { toJS } from 'mobx'


const ChangeCardForm = (props: ChangeCardFormType) => {
    const formik = useFormik({
        initialValues: {
            card: props.text
        },
        onSubmit: (values: any) => {
            console.log(values.card)
        }
    })
    return <form onSubmit={formik.handleSubmit}>
            <input 
            value={formik.values.card}
            id='card'
            type='text'
            name='card'
            onChange={formik.handleChange}
            className={(props.isCompleted)? styles.inputCompleted : styles.input}
            />
        </form>
}

let emptyField = (value: string) => {
    if(!value) {
        return 'Поле не может быть пустым'
    }
}

const NewCardForm = (props: NewCardFormType) => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: async (values: any, { resetForm }: any) => {
            AddCard_Thunk(Date.now(), values.card, [5, props.currentCardGroup.groupID], false)
            resetForm({ values: '' })
        },
    })
    return <FormikProvider value={formik}>
    <form onSubmit={formik.handleSubmit}>
            <Field
                className={styles.input}
                placeholder='Добавить карточку'
                id="card"
                name='card'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.card}
                validate={emptyField}
            />
        </form>
        </FormikProvider>
}

const CreateNewCard = (props: CreateNewCardPropsType) => {
    return <div className={styles.createCard}>
        <div className={styles.plusOutlined}>
            <PlusOutlined />
        </div>
        <div className={styles.createNewCard}>
            <NewCardForm addCard_Thunk={props.addCard_Thunk} PullAllCardsThunk={props.PullAllCardsThunk} currentCardGroup={props.currentCardGroup} groupID={props.groupID}/>
        </div>
    </div>
}

const MakeCard = observer((props: MakeCardPropsType) => {
    let addGroup = async (groupID: number, card: U_T["cardType"]) => {
        let updatedCard = card
        updatedCard.groupsIDs.push(groupID)
        ChangeCard_Thunk(updatedCard.cardID, updatedCard.text, updatedCard.groupsIDs, updatedCard.isCompleted)
    }
    let deleteGroup = async (groupID: number, card: U_T["cardType"]) => {
        let updatedCard = card
        updatedCard.groupsIDs = updatedCard.groupsIDs.filter(ID => {return ID !== groupID})
        ChangeCard_Thunk(updatedCard.cardID, updatedCard.text, updatedCard.groupsIDs, updatedCard.isCompleted)
    }
    let completeCard = async (card: U_T["cardType"]) => {
        SwitchCompleteCard_Thunk(props.cardID)
        ChangeCard_Thunk(card.cardID, card.text, card.groupsIDs, card.isCompleted)
    }
    let incompleteCard = async (card: U_T["cardType"]) => {
        SwitchCompleteCard_Thunk(props.cardID)
        ChangeCard_Thunk(card.cardID, card.text, card.groupsIDs, card.isCompleted)
    }
    // Массив со всеми группами карточки
    let requiredGroupsArray = props.groupsIDs.filter(groupID => {
        return groupID !== props.currentCardGroup.groupID
    }).map(groupID => {
        return props.allCardGroups.filter(group => { return groupID === group.groupID })[0].name
    })
    
    return <>
        <Popover
            placement="bottomLeft"
            style={{ padding: '0' }}
            content={<div>
            <Button
                danger
                type='primary'
                style={{ width: '100%' }}
                onClick={() => {DeleteCard_Thunk(props.cardID)}}>
                Delete
            </Button>
            {(props.groupsIDs.find(el => el === 1))?
            <Button type="default" onClick={() => {deleteGroup(1, props.card)}}>Убрать из представления Мой день</Button>
            :
            <Button type="default" onClick={() => {addGroup(1, props.card)}}>Добавить в представление мой день</Button>}
            </div>
            }
            trigger="contextMenu">
            <div className={styles.card}>
                <div className={styles.checkbox}>
                    <input style={{margin: '12px'}} type='checkbox' checked={props.isCompleted} id='chbox' onChange={() => {
                        if(props.isCompleted) {incompleteCard(props.card)} else {completeCard(props.card)} 
                        }} />
                </div>
                <div className={styles.cardInfo}>
                    <ChangeCardForm text={props.text} cardID={props.cardID} isCompleted={props.isCompleted}/>
                    <span className={styles.groupName}>{requiredGroupsArray.map(groupName => { 
                        if(groupName !== 'Важно') {
                            return <span key={groupName}>{groupName} </span> }
                        }
                        )}</span>
                </div>
                <div>
                    {(props.groupsIDs.find(el => el === 2) !== undefined)? 
                        <Button className={styles.starButton} onClick={() => {deleteGroup(2, props.card)}} shape="circle">
                        <StarFilled />
                        </Button>
                        :
                        <Button className={styles.starButton} onClick={() => {addGroup(2, props.card)}} shape="circle">
                        <StarOutlined />
                        </Button>
                }
                </div>
            </div>
        </Popover>
    </>
})

const MainBody = observer((props: MainBodyPropsType) => {
    useEffect(() => {
        console.log(toJS(LocalStorage.state.changedCards) )
    }, [LocalStorage.state.changedCards])
    useEffect(() => {
        console.log(toJS(LocalStorage.state.deletedCards) )
    }, [LocalStorage.state.deletedCards])
    // Функция для выбора обоев
    const wallpaper = (background: string) => {
        return (background === 'wallpaper1') ? styles.wallpaper1 :
            (background === 'wallpaper2') ? styles.wallpaper2 :
                (background === 'green') ? styles.green :
                    (background === 'orange') ? styles.orange :
                        (background === 'red') ? styles.red :
                            (background === 'blue') ? styles.blue : undefined
    }
    // Массив с невыполненным карточками
    let incompletedCards = LocalStorage.state.currentCards.filter((card: U_T["cardType"]) => {
        return card.isCompleted === false
    })
    // Массив с выполненным карточками
    let completedCards = LocalStorage.state.currentCards.filter((card: U_T["cardType"]) => {
        return card.isCompleted === true
    })
    // Условие, которое показывает либо поиск либо выбранную колоду карточек
    if(props.isSearchOn) {
        return <div>{LocalStorage.state.allCards.filter(card => {
            return card.text.includes(props.searchInputValue)
        }).map(card => {
            return <MakeCard changeCard_Thunk={props.changeCard_Thunk} deleteCard_Thunk={props.deleteCard_Thunk} PullAllCardsThunk={props.PullAllCardsThunk} switchCompleteCardThunk={props.switchCompleteCardThunk} deleteGroupIDThunk={props.deleteGroupIDThunk} addGroupIDThunk={props.addGroupIDThunk} deleteCardThunk={props.deleteCardThunk} card={card} key={card.cardID} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupsIDs={card.groupsIDs} allCardGroups={props.allCardGroups} isCompleted={card.isCompleted}/>
        })}</div>
    } else {
        return <div className={wallpaper(props.background)}>
        <div style={{ height: '80vh' }}>
            {/* Название выбранной группы */}
            <div className={styles.header}>
                <h1>{LocalStorage.state.currentCardGroup.name}</h1>
            </div>
            {/* Карточки */}
            <div className={styles.scroll}>
                {/* Невыполненные карточки */}
                {incompletedCards.map(card => {
                    return <MakeCard changeCard_Thunk={props.changeCard_Thunk} deleteCard_Thunk={props.deleteCard_Thunk}  card={card} PullAllCardsThunk={props.PullAllCardsThunk} switchCompleteCardThunk={props.switchCompleteCardThunk} deleteGroupIDThunk={props.deleteGroupIDThunk} addGroupIDThunk={props.addGroupIDThunk} deleteCardThunk={props.deleteCardThunk} key={card.cardID} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupsIDs={card.groupsIDs} allCardGroups={props.allCardGroups} isCompleted={card.isCompleted}/>
                })}
                {/* Выполненные карточки */}
                <p>Выполненные задач</p>
                {completedCards.map(card => {
                    return <MakeCard changeCard_Thunk={props.changeCard_Thunk} deleteCard_Thunk={props.deleteCard_Thunk} card={card} PullAllCardsThunk={props.PullAllCardsThunk} switchCompleteCardThunk={props.switchCompleteCardThunk} deleteGroupIDThunk={props.deleteGroupIDThunk} addGroupIDThunk={props.addGroupIDThunk} deleteCardThunk={props.deleteCardThunk} key={card.cardID} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupsIDs={card.groupsIDs} allCardGroups={props.allCardGroups} isCompleted={card.isCompleted}/>
                })}
            </div>
        </div>
        {/* Окно создания новой карточки */}
        <div>
            <CreateNewCard addCard_Thunk={props.addCard_Thunk} PullAllCardsThunk={props.PullAllCardsThunk} currentCardGroup={props.currentCardGroup} groupID={props.currentCardGroup.groupID} />
        </div>
    </div>
    }
})

const mapStateToProps = (state: AppStateType) => {
    return {
        currentCardGroup: state.data.currentCardGroup,
        allCardGroups: state.data.allCardGroups,
        background: state.data.currentCardGroup.background,
        currentCards: state.data.currentCards,
        isSearchOn: state.data.isSearchOn,
        allCards: state.data.allCards,
        searchInputValue: state.data.searchInputValue
    }
}
const mapDispatchToProps = () => {
    return { 
        changeCard_Thunk: StateControllerThunks.changeCard_Thunk, 
        deleteCard_Thunk: StateControllerThunks.deleteCard_Thunk, 
        deleteCardThunk: StateControllerThunks.deleteCard_Thunk, 
        addGroupIDThunk: addGroupID_Thunk, 
        deleteGroupIDThunk: deleteGroupID_Thunk, 
        switchCompleteCardThunk: switchCompleteCard_Thunk, 
        PullAllCardsThunk: ControllerThunks.pullAllCards_Thunk, 
        addCard_Thunk: StateControllerThunks.addCard_Thunk }
}
const MainBodyContainer = connect<MapStateType, mapDispatchType, void, AppStateType>(mapStateToProps, mapDispatchToProps())(MainBody)

export default MainBodyContainer