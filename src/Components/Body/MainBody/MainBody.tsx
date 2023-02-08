import { connect } from "react-redux";
import styles from './MainBody.module.css'
import { Checkbox, Popconfirm, Popover, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import { addNewCardAC, changeCardAC, deleteCardAC } from "../../Redux/DataReducer";
import React from "react";
import { Formik, useFormik } from "formik";
import { AppStateType } from "../../Redux/Redux";
import { ChangeCardFormType, CreateNewCardPropsType, MainBodyPropsType, MakeCardPropsType, mapDispatchType, MapStateType, NewCardFormType } from "./MainBodyTypes";


const ChangeCardForm = (props: ChangeCardFormType) => {
    const formik = useFormik({
        initialValues: {
            card: props.text
        },
        onSubmit: (values: any) => {
            console.log(values.card)
            props.changeCardAC(values.card, props.cardID)
        }
    })
    return <form onSubmit={formik.handleSubmit}>
            <input 
            value={formik.values.card}
            id='card'
            type='text'
            name='card'
            onChange={formik.handleChange}
            className={styles.input}
            />
        </form>
}

const NewCardForm = (props: NewCardFormType) => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            props.addNewCardAC(values.card, props.groupID)
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
            <NewCardForm groupID={props.groupID} addNewCardAC={props.addNewCardAC} />
        </div>
    </div>
}

const MakeCard = (props: MakeCardPropsType) => {
    let requiredGroupsArray = props.groupID.filter(groupID => {
        return groupID !== props.currentCardGroup.groupID
    }).map(groupID => {
        return props.allCardGroups.filter(group => { return groupID === group.groupID })[0].name
    })
    return <>
        <Popover
            placement="bottomLeft"
            style={{ padding: '0' }}
            content={<Button
                danger
                type='primary'
                style={{ width: '100%' }}
                onClick={() => { props.deleteCardAC(props.cardID) }}>
                Delete
            </Button>
            }
            trigger="contextMenu">
            <div className={styles.card}>
                <div className={styles.checkbox}>
                    <Checkbox style={{ marginTop: '8px' }} />
                </div>
                <div className={styles.cardInfo}>
                    <ChangeCardForm changeCardAC={props.changeCardAC} text={props.text} cardID={props.cardID}/>
                    <span className={styles.groupName}>{requiredGroupsArray.map(groupName => { return <span key={groupName}>{groupName} </span> })}</span>
                </div>
            </div >
        </Popover>
    </>
}

const MainBody = (props: MainBodyPropsType) => {
    const wallpaper = (background: string) => {
        return (background === 'wallpaper1') ? styles.wallpaper1 :
            (background === 'wallpaper2') ? styles.wallpaper2 :
                (background === 'green') ? styles.green :
                    (background === 'orange') ? styles.orange :
                        (background === 'red') ? styles.red :
                            (background === 'blue') ? styles.blue : undefined
    }
    // Нужная группа карточек
    let requiredCardGroupArray = props.allCardGroups.filter(cardGroup => {
        return cardGroup.groupID === props.currentCardGroup.groupID
    })[0]
    // Массив в котором лежат нужные карточки
    let requiredCardsArray = requiredCardGroupArray.cards

    return <div className={wallpaper(props.background)}>
        <div style={{ height: '80vh' }}>
            <div className={styles.header}>
                <h1>{props.currentCardGroup.name}</h1>
            </div>
            <div className={styles.scroll}>
                {requiredCardsArray.map(card => {
                    return <MakeCard key={card.cardID} changeCardAC={props.changeCardAC} deleteCardAC={props.deleteCardAC} cardID={card.cardID} text={card.text} currentCardGroup={props.currentCardGroup} groupID={card.groupID} allCardGroups={props.allCardGroups} />
                })}
            </div>
        </div>
        <div>
            <CreateNewCard groupID={props.currentCardGroup.groupID} addNewCardAC={props.addNewCardAC} />
        </div>
    </div>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        currentCardGroup: state.data.currentCardGroup,
        allCardGroups: state.data.allCardGroups,
        background: state.data.currentCardGroup.background
    }
}

const MainBodyContainer = connect<MapStateType, mapDispatchType, void, AppStateType>(mapStateToProps, { addNewCardAC, deleteCardAC, changeCardAC })(MainBody)

export default MainBodyContainer