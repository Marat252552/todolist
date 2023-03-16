import styles from './MainBody.module.css'
import { U_T } from "../../Redux/ReduxTypes";
import LocalStorage from "../../Mobx/LocalStorage";
import { observer } from "mobx-react-lite";
import { message, Drawer, Button } from 'antd';
import HighComponent from "./Helpers/HighComponent";
import { useState, useEffect } from 'react';
import LowComponent from './Helpers/LowComponent'


let DrawerComponent = (props: {observableCardID: number, DrawerF: { showDrawer: (card: U_T["cardType"]) => void; close: () => void; }, SetMessageError: (value: string) => void, open: boolean}) => {
    return <Drawer title="Basic Drawer" placement="right" onClose={props.DrawerF.close} open={props.open}>
            <div style={{height: '90%'}}>
                {(props.open)? 
                <div>
                <LowComponent.Block>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 16fr 2fr' }}>
                    <LowComponent.DrawerCheckBox observableCardID={props.observableCardID} SetMessageError={props.SetMessageError} stopPropagation={true} />
                    <LowComponent.DrawerCardInfo observableCardID={props.observableCardID} SetMessageError={props.SetMessageError}/>
                    <LowComponent.Buttons.DrawerImportant observableCardID={props.observableCardID} SetMessageError={props.SetMessageError} />
                </div>
            </LowComponent.Block>
            <LowComponent.Buttons.DrawerMyDay observableCardID={props.observableCardID} SetMessageError={props.SetMessageError} /></div>
            : <div></div>
                }
                
            </div>
            <div className={styles.line}></div>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <LowComponent.Buttons.DrawerDeleteCard onClose={props.DrawerF.close} SetMessageError={props.SetMessageError} observableCardID={props.observableCardID}/>
            </div>
        </Drawer>
}

const MainBody = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const SetMessageError = (value: string) => {
        messageApi.open({
            type: 'error',
            content: value,
        });
    }
    let [observableCardID, setCardID] = useState(0)
    const [open, setOpen] = useState(false);
    const DrawerF = {
        showDrawer: (card: U_T["cardType"]) => {
            setOpen(true);
            setCardID(card.cardID)
        },
        close: () => {
            setOpen(false);
        }
    }
    // Функция для выбора обоев
    const wallpaper = (background: string) => {
        return (background === 'wallpaper1') ? styles.wallpaper1 :
            (background === 'wallpaper2') ? styles.wallpaper2 :
                (background === 'green') ? styles.green :
                    (background === 'orange') ? styles.orange :
                        (background === 'red') ? styles.red :
                            (background === 'blue') ? styles.blue : undefined
    }
    let cards = {
        // Массив с невыполненным карточками
        incompletedCards: LocalStorage.state.currentCards.filter((card: U_T["cardType"]) => {
            return card.isCompleted === false
        }),
        // Массив с выполненным карточками
        completedCards: LocalStorage.state.currentCards.filter((card: U_T["cardType"]) => {
            return card.isCompleted === true
        })
    }
    // Условие, которое показывает либо поиск либо выбранную колоду карточек
    return <div className={wallpaper(LocalStorage.state.currentCardGroup.background)}>
        {contextHolder}
        <DrawerComponent observableCardID={observableCardID} DrawerF={DrawerF} SetMessageError={SetMessageError} open={open}/>
        <div style={{ height: '80vh' }}>
            {/* Название выбранной группы */}
            <h1 className={styles.header}>{LocalStorage.state.currentCardGroup.name}</h1>
            {/* Карточки */}
            <HighComponent.CurrentCards setCardID={setCardID} showDrawer={DrawerF.showDrawer} SetMessageError={SetMessageError} cards={cards} />
        </div>
        {/* Окно создания новой карточки */}
        <HighComponent.CreateNewCardForm SetMessageError={SetMessageError} />
    </div>
})

export default MainBody