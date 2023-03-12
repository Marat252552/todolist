import MainBody from "./MainBody/MainBody"
import Menu from "./Menu/Menu"
import styles from './Body.module.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { LoggedAPI } from "../../Api/Api";
import { BodyProps_T } from "./types";
import LoadingScreen from './../LoadingScreen/LoadingScreen'
import LocalStorage from "../LocalStorage";
import { observer } from "mobx-react-lite";


const Body = observer((props: BodyProps_T) => {
    console.log('Page - Body')
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => {
            try {
                let response = await LoggedAPI()
                if(response.status === 200) {
                    LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                    LocalStorage.setIsAuthorized(true)
                    props.PullAllCardsThunk()
                } else {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            } catch(e: any) {
                if(e.response.status === 401) {
                    LocalStorage.setIsAuthorized(false)
                    LocalStorage.setToken('')
                }
            }
        }
        a()
    }, [])
        return <div className={styles.body}>
            <Menu />
            <MainBody />
        </div>
})

export default Body