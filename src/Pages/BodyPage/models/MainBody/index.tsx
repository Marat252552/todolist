import styles from './lib/styles.module.css'
import { U_T } from '../../../../Shared/Types/typessss';
import LocalStorage from '../../../../App/state/LocalStorage';
import { observer } from "mobx-react-lite";
import { message, Drawer, Button } from 'antd';
import { useState, useEffect } from 'react';
import CardsState from '../../../../App/state/CardsState';
import GroupsState from '../../../../App/state/GroupsState';
import Block from '../../../../UI/Block';
import DrawerCheckBox from '../../../../UI/DrawerCheckbox';
import DrawerCardInfo from '../../../../UI/DrawerInfo';
import ButtonDrawerImportant from '../../../../UI/ButtonDrawerImportant';
import ButtonDrawerMyDay from '../../../../UI/ButtonDrawerMyDay';
import ButtonDrawerDeleteCard from '../../../../UI/ButtonDrawerDeleteCard';
import CurrentCards from '../../../../Widgets/CurrentCards';
import { Card_T } from '../../../../Shared/Types/types';
import NewCardForm from '../../../../Widgets/NewCardForm';


let DrawerComponent = (props: { observableid: string, DrawerF: { showDrawer: (card: Card_T) => void; close: () => void; },  open: boolean }) => {
    return <Drawer title="Basic Drawer" placement="right" onClose={props.DrawerF.close} open={props.open}>
        <div style={{ height: '90%' }}>
            {(props.open) ?
                <div>
                    <Block>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 16fr 2fr' }}>
                            <DrawerCheckBox observableid={props.observableid} stopPropagation={true} />
                            <DrawerCardInfo observableid={props.observableid}  />
                            <ButtonDrawerImportant observableid={props.observableid} />
                        </div>
                    </Block>
                    <ButtonDrawerMyDay observableid={props.observableid} /></div>
                : <div></div>
            }
        </div>
        <div className={styles.line}></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonDrawerDeleteCard onClose={props.DrawerF.close} observableid={props.observableid} />
        </div>
    </Drawer>
}

const MainBody = observer((props: { searchInput: string, setError: (value: string) => void }) => {
    let [observableid, setid] = useState('')
    const [open, setOpen] = useState(false);
    let [cards, setCards] = useState<{ incompletedCards: any, completedCards: any }>({
        incompletedCards: [],
        completedCards: []
    } as any)
    useEffect(() => {
        let search = props.searchInput
        // Массив с невыполненным карточками
        let incompletedCards = CardsState.currentCards.filter((card: U_T["cardType"]) => {
            if(search === '' && card.is_completed === false ) {
                return card
            } else if(search !== '' && card.content.includes(search) && card.is_completed === false) {
                return card
            }
        })
        // Массив с выполненным карточками
        let completedCards = CardsState.currentCards.filter((card: U_T["cardType"]) => {
            if(search === '' && card.is_completed === true ) {
                return card
            } else if(search !== '' && card.content.includes(search) && card.is_completed === true) {
                return card
            }
        })
        setCards({
            incompletedCards,
            completedCards
        })
    }, [props.searchInput, CardsState.currentCards])
    const DrawerF = {
        showDrawer: (card: Card_T) => {
            setOpen(true);
            setid(card._id)
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
    // Условие, которое показывает либо поиск либо выбранную колоду карточек
    return <div className={wallpaper(GroupsState.currentCardGroup.background)}>
        <DrawerComponent observableid={observableid} DrawerF={DrawerF} open={open} />
        <div style={{ height: '80vh' }}>
            {/* Название выбранной группы */}
            <h1 className={styles.header}>{GroupsState.currentCardGroup.name}</h1>
            {/* Карточки */}
            <CurrentCards setid={setid} showDrawer={DrawerF.showDrawer} cards={cards} />
        </div>
        {/* Окно создания новой карточки */}
        <NewCardForm />
    </div>
})

export default MainBody