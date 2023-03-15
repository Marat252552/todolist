import MainBody from "./MainBody/MainBody"
import Menu from "./Menu/Menu"
import styles from './Body.module.css';
import { useEffect } from "react";
import { AuthAPI } from "../../Api/Api";
import LocalStorage from "../Mobx/LocalStorage";
import { observer } from "mobx-react-lite";
import { ModalWindow } from "../Modal/Modal";
import { message, Result, Button } from 'antd';
import { PullAllCards_Thunk } from "../Mobx/Thunks";

const Body = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const SetMessageError = (value: string) => {
        messageApi.open({
            type: 'error',
            content: value,
        });
    }
    let setActive = () => {
        LocalStorage.setNotedAboutActivated(true)
    }
    // Проверка авторизации
    useEffect(() => {
        let a = async () => {
            try {
                let response = await AuthAPI.Logged()
                if (response.status === 200) {
                    LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                    LocalStorage.setIsAuthorized(true)
                    PullAllCards_Thunk()
                    console.log(response.data.isActivated)
                    if (response.data.isActivated === 0) {
                        LocalStorage.setNotedAboutActivated(false)
                    }
                    LocalStorage.setIsActivated(response.data.isActivated)
                } else {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            } catch (e: any) {
                SetMessageError('Кажется, произошла ошибка')
                if (e.response.status === 401) {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            }
        }
        a()
    }, [])
    return <div className={styles.body}>
        {contextHolder}
        <Menu />
        <MainBody />
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

export default Body