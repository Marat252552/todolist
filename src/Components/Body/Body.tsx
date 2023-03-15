import MainBody from "./MainBody/MainBody"
import Menu from "./Menu/Menu"
import styles from './Body.module.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { AuthAPI } from "../../Api/Api";
import { BodyProps_T } from "./types";
import LoadingScreen from './../LoadingScreen/LoadingScreen'
import LocalStorage from "../Mobx/LocalStorage";
import { observer } from "mobx-react-lite";
import { ModalWindow } from "../Modal/Modal";
import {useState} from 'react'
import { message } from 'antd';
import { PullAllCards_Thunk } from "../Mobx/Thunks";


const Body = observer((props: BodyProps_T) => {
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
                if(response.status === 200) {
                    LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                    LocalStorage.setIsAuthorized(true)
                    PullAllCards_Thunk()
                } else {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            } catch(e: any) {
                SetMessageError('Кажется, произошла ошибка')
                if(e.response.status === 401) {
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
                Здравствуйте! Ваша почта не подтверждена!
            </ModalWindow>
        </div>
})

export default Body