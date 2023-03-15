import { PlusOutlined } from "@ant-design/icons"
import { Popover } from "antd"
import { useFormik, FormikProvider, Field } from "formik"
import { observer } from "mobx-react-lite"
import LocalStorage from "../../../Mobx/LocalStorage"
import { AddCard_Thunk } from "../../../Mobx/Thunks"
import { U_T } from "../../../Redux/ReduxTypes"
import { CreateNewCardPropsType, NewCardFormType, ChangeCardFormType, MakeCardPropsType } from "../types"
import Actions from "./Actions"
import LowComponent from "./LowComponent"
import styles from './../MainBody.module.css'

let emptyField = (value: string) => {
    if (!value) {
        return 'Поле не может быть пустым'
    }
}

const HighComponent = {
    CreateNewCardForm: (props: CreateNewCardPropsType) => {
        return <div className={styles.createCard}>
            <div className={styles.plusOutlined}>
                <PlusOutlined />
            </div>
            <div className={styles.createNewCard}>
                <HighComponent.NewCardForm SetMessageError={props.SetMessageError} />
            </div>
        </div>
    },
    NewCardForm: (props: NewCardFormType) => {
        const formik = useFormik({
            initialValues: {
                card: '',
            },
            onSubmit: async (values: any, { resetForm }: any) => {
                AddCard_Thunk(Date.now(), values.card, [5, LocalStorage.state.currentCardGroup.groupID], false, props.SetMessageError)
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
    },
    ChangeCardForm: (props: ChangeCardFormType) => {
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
                className={(props.isCompleted) ? styles.inputCompleted : styles.input}
            />
        </form>
    },
    CurrentCards: (props: {cards: {incompletedCards: Array<U_T["cardType"]>, completedCards: Array<U_T["cardType"]>}, SetMessageError: (value: string) => void}) => {
        return <div className={styles.scroll}>
        {/* Невыполненные карточки */}
        {props.cards.incompletedCards.map((card: U_T["cardType"]) => {
            return <HighComponent.MakeCard SetMessageError={props.SetMessageError} card={card} key={card.cardID} />
        })}
        {/* Выполненные карточки */}
        <p>Выполненные задач</p>
        {props.cards.completedCards.map((card: U_T["cardType"]) => {
            return <HighComponent.MakeCard SetMessageError={props.SetMessageError} card={card} key={card.cardID} />
        })}
    </div>
    },
    SearchedCards: (props: {searchInputValue: string, SetMessageError: (value: string) => void}) => {
        return <div>{LocalStorage.state.allCards.filter(card => {
            return card.text.includes(props.searchInputValue)
        }).map(card => {
            return <HighComponent.MakeCard SetMessageError={props.SetMessageError} card={card} key={card.cardID} />
        })}</div>
    },
    MakeCard: observer((props: MakeCardPropsType) => {
        // Массив со всеми группами карточки
        let requiredGroupsArray = props.card.groupsIDs.filter(groupID => {
            return groupID !== LocalStorage.state.currentCardGroup.groupID
        }).map(groupID => {
            return LocalStorage.state.allCardGroups.filter(group => { return groupID === group.groupID })[0].name
        })
        return <>
            <Popover
                placement="bottomLeft"
                style={{ padding: '0' }}
                content={<div>
                    <LowComponent.Buttons.DeleteCard SetMessageError={props.SetMessageError} cardID={props.card.cardID} />
                    <LowComponent.Buttons.MyDay SetMessageError={props.SetMessageError} card={props.card} groupsIDs={props.card.groupsIDs} />
                </div>
                }
                trigger="contextMenu">
                <div className={styles.card}>
                    <LowComponent.CheckBox card={props.card} stopPropagation={false} SetMessageError={props.SetMessageError}  />
                    <LowComponent.CardInfo requiredGroupsArray={requiredGroupsArray} text={props.card.text} />
                    <LowComponent.Buttons.Important card={props.card} SetMessageError={props.SetMessageError}  />
                </div>
            </Popover>
        </>
    })
}

export default HighComponent