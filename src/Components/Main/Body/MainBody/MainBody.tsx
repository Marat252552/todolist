import styles from './MainBody.module.css'
import { U_T } from "../../../Side/Redux/ReduxTypes";
import LocalStorage from "../../../Side/Mobx/LocalStorage";
import { observer } from "mobx-react-lite";
import { message, Drawer, Button } from 'antd';
import HighComponent from "./Helpers/HighComponent";
import { useState, useEffect } from 'react';
import LowComponent from './Helpers/LowComponent'


let DrawerComponent = (props: {observableid: number, DrawerF: { showDrawer: (card: U_T["cardType"]) => void; close: () => void; }, setError: (value: string) => void, open: boolean}) => {
    return <Drawer title="Basic Drawer" placement="right" onClose={props.DrawerF.close} open={props.open}>
            <div style={{height: '90%'}}>
                {(props.open)? 
                <div>
                <LowComponent.Block>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 16fr 2fr' }}>
                    <LowComponent.DrawerCheckBox observableid={props.observableid} setError={props.setError} stopPropagation={true} />
                    <LowComponent.DrawerCardInfo observableid={props.observableid} setError={props.setError}/>
                    <LowComponent.Buttons.DrawerImportant observableid={props.observableid} setError={props.setError} />
                </div>
            </LowComponent.Block>
            <LowComponent.Buttons.DrawerMyDay observableid={props.observableid} setError={props.setError} /></div>
            : <div></div>
                }
                
            </div>
            <div className={styles.line}></div>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <LowComponent.Buttons.DrawerDeleteCard onClose={props.DrawerF.close} setError={props.setError} observableid={props.observableid}/>
            </div>
        </Drawer>
}

const MainBody = observer((props: {setError: (value: string) => void}) => {
    let [observableid, setid] = useState(0)
    const [open, setOpen] = useState(false);
    const DrawerF = {
        showDrawer: (card: U_T["cardType"]) => {
            setOpen(true);
            setid(card.id)
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
            return card.is_completed === false
        }),
        // Массив с выполненным карточками
        completedCards: LocalStorage.state.currentCards.filter((card: U_T["cardType"]) => {
            return card.is_completed === true
        })
    }
    // Условие, которое показывает либо поиск либо выбранную колоду карточек
    return <div className={wallpaper(LocalStorage.state.currentCardGroup.background)}>
        <DrawerComponent observableid={observableid} DrawerF={DrawerF} setError={props.setError} open={open}/>
        <div style={{ height: '80vh' }}>
            {/* Название выбранной группы */}
            <h1 className={styles.header}>{LocalStorage.state.currentCardGroup.name}</h1>
            {/* Карточки */}
            <HighComponent.CurrentCards setid={setid} showDrawer={DrawerF.showDrawer} setError={props.setError} cards={cards} />
        </div>
        {/* Окно создания новой карточки */}
        <HighComponent.CreateNewCardForm setError={props.setError} />
    </div>
})

export default MainBody