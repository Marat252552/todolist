import styles from './MainBody.module.css'
import { U_T } from "../../Redux/ReduxTypes";
import LocalStorage from "../../Mobx/LocalStorage";
import { observer } from "mobx-react-lite";
import { message } from 'antd';
import HighComponent from "./Helpers/HighComponent";

const MainBody = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const SetMessageError = (value: string) => {
        messageApi.open({
            type: 'error',
            content: value,
        });
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
    if (LocalStorage.state.isSearchOn) {
        return <HighComponent.SearchedCards SetMessageError={SetMessageError} searchInputValue={LocalStorage.state.searchInputValue}/>
    } else {
        return <div className={wallpaper(LocalStorage.state.currentCardGroup.background)}>
            {contextHolder}
            <div style={{ height: '80vh' }}>
                {/* Название выбранной группы */}
                <h1 className={styles.header}>{LocalStorage.state.currentCardGroup.name}</h1>
                {/* Карточки */}
                <HighComponent.CurrentCards SetMessageError={SetMessageError} cards={cards} />
            </div>
            {/* Окно создания новой карточки */}
            <HighComponent.CreateNewCardForm SetMessageError={SetMessageError} />
        </div>
    }
})

export default MainBody