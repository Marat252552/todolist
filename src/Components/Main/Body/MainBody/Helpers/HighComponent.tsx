import { PlusOutlined } from "@ant-design/icons"
import { Popover } from "antd"
import { useFormik, FormikProvider, Field } from "formik"
import { observer } from "mobx-react-lite"
import LocalStorage from "../../../../Side/Mobx/LocalStorage"
import { AddCard_Thunk } from "../../../../Side/Mobx/Thunks"
import { U_T } from "../../../../Side/Redux/ReduxTypes"
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
                let text = values.card
                Actions.addCard(text, props.SetMessageError, resetForm)
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
    DrawerChangeCardForm: (props: ChangeCardFormType) => {
        const formik = useFormik({
            initialValues: {
                card: props.card.text
            },
            onSubmit: (values: any) => {
                let text = values.card
                Actions.changeCardText(props.card, text, props.SetMessageError)
            }
        })
        return <form onSubmit={formik.handleSubmit}>
            <input
                value={formik.values.card}
                id='card'
                type='text'
                name='card'
                onChange={formik.handleChange}
                className={styles.input2}
            />
        </form>
    },
    CurrentCards: (props: {setCardID: any, showDrawer: any, cards: {incompletedCards: Array<U_T["cardType"]>, completedCards: Array<U_T["cardType"]>}, SetMessageError: (value: string) => void}) => {
        return <div className={styles.scroll} >
        {/* Невыполненные карточки */}
        {props.cards.incompletedCards.map((card: U_T["cardType"]) => {
            return <HighComponent.MakeCard setCardID={props.setCardID} showDrawer={props.showDrawer} SetMessageError={props.SetMessageError} card={card} key={card.cardID} />
        })}
        {/* Выполненные карточки */}
        <p>Выполненные задач</p>
        {props.cards.completedCards.map((card: U_T["cardType"]) => {
            return <HighComponent.MakeCard setCardID={props.setCardID} showDrawer={props.showDrawer} SetMessageError={props.SetMessageError} card={card} key={card.cardID} />
        })}
    </div>
    },
    SearchedCards: (props: {cards: any, setCard: any, showDrawer: any, setCardID: any, searchInputValue: string, SetMessageError: (value: string) => void}) => {
        return <div>{LocalStorage.state.allCards.filter(card => {
            return card.text.includes(props.searchInputValue)
        }).map(card => {
            return <HighComponent.MakeCard setCardID={props.setCardID} showDrawer={props.showDrawer} SetMessageError={props.SetMessageError} card={card} key={card.cardID} />
        })}</div>
    },
    MakeCard: observer((props: MakeCardPropsType) => {
        // Массив со всеми группами карточки
        let requiredGroupsArray = props.card.groupsIDs.filter(groupID => {
            return groupID !== LocalStorage.state.currentCardGroup.groupID
        }).map(groupID => {
            try {
                return LocalStorage.state.allCardGroups.filter(group => { return groupID === group.groupID })[0].name
            } catch(e) {
                return undefined
            }
        })
        if(requiredGroupsArray === undefined) {
            return <div></div>
        }
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
                <div className={styles.card} onClick={() => {
                    props.showDrawer(props.card)
                }}>
                    <LowComponent.CheckBox card={props.card} stopPropagation={false} SetMessageError={props.SetMessageError}  />
                    <LowComponent.CardInfo requiredGroupsArray={requiredGroupsArray!} text={props.card.text} />
                    <LowComponent.Buttons.Important card={props.card} SetMessageError={props.SetMessageError}  />
                </div>
            </Popover>
        </>
    })
}

export default HighComponent