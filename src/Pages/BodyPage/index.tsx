import MainBody from "./models/MainBody"; 
import Menu from "./models/Menu";
import styles from './lib/styles.module.css';
import { useEffect } from "react";
import LocalStorage from "../../App/state/LocalStorage";
import { observer } from "mobx-react-lite";
import { ModalWindow } from "../../Shared/Widgets/Modal/Modal";
import { message, Result, Button } from 'antd';
import { PullAllCards_Thunk, PullAllGroups_Thunk } from './processes/Thunks'
import { LoggedAPI } from "../../Shared/Api/Api";

const BodyPage = observer((props: {setError: (value: string) => void}) => {
    let setActive = () => {
        LocalStorage.setNotedAboutActivated(true)
    }
    // Проверка авторизации
    useEffect(() => {
        let a = async () => {
            try {
                let response = await LoggedAPI()
                if (response.status === 200) {
                    LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email, response.data.imgSRC)
                    LocalStorage.setIsAuthorized(true)
                    PullAllCards_Thunk()
                    PullAllGroups_Thunk()
                    if (response.data.isActivated === false) {
                        LocalStorage.setNotedAboutActivated(false)
                    }
                    LocalStorage.setIsActivated(response.data.isActivated)
                } else {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            } catch (e: any) {
                props.setError('Кажется, произошла ошибка')
                if (e.response.status === 401) {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            }
        }
        a()
    }, [])
    return <div className={styles.body}>
        <Menu />
        <MainBody setError={props.setError}/>
        <ModalWindow active={!LocalStorage.notedAboutActivated} setActive={setActive}>
            <Result
                status="warning"
                title="Почта не подтверждена"
                subTitle="Чтобы получить доступ ко всем функциям приложения,
                 необходимо подтвердить указанную Вами почту"
                extra={
                    <Button type="primary" onClick={setActive}>
                        Хорошо
                    </Button>
                }
            />
        </ModalWindow>
    </div>
})

export default BodyPage