import { connect } from "react-redux";
import styles from './MainBody.module.css'
import { Checkbox, Popconfirm, Popover, Button } from "antd";
import { PlusOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { addGroupIDThunk, addNewCardThunk, changeCardThunk, deleteCardThunk, deleteGroupIDThunk, switchCompleteCard, switchCompleteCardThunk } from "../../Redux/DataReducer";
import React from "react";
import { Formik, useFormik } from "formik";
import { AppStateType } from "../../Redux/Redux";
import { ChangeCardFormType, CreateNewCardPropsType, MainBodyPropsType, MakeCardPropsType, mapDispatchType, MapStateType, NewCardFormType } from "./MainBodyTypes";
import { MainPageAPI } from "../../../Api/Api";



const ChangeCardForm = (props: ChangeCardFormType) => {
    const formik = useFormik({
        initialValues: {
            card: props.text
        },
        onSubmit: (values: any) => {
            console.log(values.card)
            props.changeCardThunk(values.card, props.cardID)
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

const NewCardForm = (props: NewCardFormType) => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            props.addNewCardThunk(values.card, props.groupID)
            resetForm({ values: '' })
        },
    })
    return <form onSubmit={formik.handleSubmit}>
            <input
                className={styles.input}
                placeholder='Добавить карточку'
                id="card"
                name='card'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.card}
            />
        </form>
}

const CreateNewCard = (props: CreateNewCardPropsType) => {
    return <div className={styles.createCard}>
        <div className={styles.plusOutlined}>
            <PlusOutlined />
        </div>
        <div className={styles.createNewCard}>
            <NewCardForm groupID={props.groupID} addNewCardThunk={props.addNewCardThunk}/>
        </div>
    </div>
}

const MakeCard = (props: MakeCardPropsType) => {
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
                onClick={() => { props.deleteCardThunk(props.cardID) }}>
                Delete
            </Button>
            {(props.groupsIDs.find(el => el === 1))? 
            <Button type="default" onClick={() => {props.deleteGroupIDThunk(1, props.cardID)}}>Убрать из представления Мой день</Button>
            :
            <Button type="default" onClick={() => {props.addGroupIDThunk(1, props.cardID)}}>Добавить в представление мой день</Button>}
            </div>
            }
            trigger="contextMenu">
            <div className={styles.card}>
                <div className={styles.checkbox}>
                    <input style={{margin: '12px'}} type='checkbox' checked={props.isCompleted} id='chbox' onChange={() => {props.switchCompleteCardThunk(props.cardID)}} />
                </div>
                <div className={styles.cardInfo}>
                    <ChangeCardForm changeCardThunk={props.changeCardThunk} text={props.text} cardID={props.cardID} isCompleted={props.isCompleted}/>
                    <span className={styles.groupName}>{requiredGroupsArray.map(groupName => { return <span key={groupName}>{groupName} </span> })}</span>
                </div>
                <div>
                    {(props.groupsIDs.find(el => el === 2) !== undefined)? 
                        <Button className={styles.starButton} onClick={() => {props.deleteGroupIDThunk(2, props.cardID)}} shape="circle">
                        <StarFilled />
                        </Button>
                        :
                        <Button className={styles.starButton} onClick={() => {props.addGroupIDThunk(2, props.cardID)}} shape="circle">
                        <StarOutlined />
                        </Button>
                }
                </div>
            </div>
        </Popover>
    </>
}

const MainBody = (props: MainBodyPropsType) => {
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
    let incompletedCards = props.currentCards.filter(card => {
        return card.isCompleted === false
    })
    // Массив с выполненным карточками
    let completedCards = props.currentCards.filter(card => {
        return card.isCompleted === true
    })
    // Условие, которое показывает либо поиск либо выбранную колоду карточек
    if(props.isSearchOn) {
        return <div>{props.allCards.filter(card => {
            return card.text.includes(props.searchInputValue)
        }).map(card => {
            return <MakeCard switchCompleteCardThunk={props.switchCompleteCardThunk} changeCardThunk={props.changeCardThunk} deleteGroupIDThunk={props.deleteGroupIDThunk} addGroupIDThunk={props.addGroupIDThunk} deleteCardThunk={props.deleteCardThunk} key={card.cardID} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupsIDs={card.groupsIDs} allCardGroups={props.allCardGroups} isCompleted={card.isCompleted}/>
        })}</div>
    } else {
        return <div className={wallpaper(props.background)}>
        <div style={{ height: '80vh' }}>
            {/* Название выбранной группы */}
            <div className={styles.header}>
                <h1>{props.currentCardGroup.name}</h1>
            </div>
            {/* Карточки */}
            <div className={styles.scroll}>
                {/* Невыполненные карточки */}
                {incompletedCards.map(card => {
                    return <MakeCard switchCompleteCardThunk={props.switchCompleteCardThunk} changeCardThunk={props.changeCardThunk} deleteGroupIDThunk={props.deleteGroupIDThunk} addGroupIDThunk={props.addGroupIDThunk} deleteCardThunk={props.deleteCardThunk} key={card.cardID} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupsIDs={card.groupsIDs} allCardGroups={props.allCardGroups} isCompleted={card.isCompleted}/>
                })}
                {/* Выполненные карточки */}
                <p>Выполненные задач</p>
                {completedCards.map(card => {
                    return <MakeCard switchCompleteCardThunk={props.switchCompleteCardThunk} changeCardThunk={props.changeCardThunk} deleteGroupIDThunk={props.deleteGroupIDThunk} addGroupIDThunk={props.addGroupIDThunk} deleteCardThunk={props.deleteCardThunk} key={card.cardID} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupsIDs={card.groupsIDs} allCardGroups={props.allCardGroups} isCompleted={card.isCompleted}/>
                })}
            </div>
        </div>
        {/* Окно создания новой карточки */}
        <div>
            <CreateNewCard addNewCardThunk={props.addNewCardThunk} groupID={props.currentCardGroup.groupID} />
        </div>
    </div>
    }
}

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

const MainBodyContainer = connect<MapStateType, mapDispatchType, void, AppStateType>(mapStateToProps, { addNewCardThunk, deleteCardThunk, addGroupIDThunk, deleteGroupIDThunk, changeCardThunk, switchCompleteCardThunk })(MainBody)

export default MainBodyContainer