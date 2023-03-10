import MainBody from "./MainBody/MainBody"
import Menu from "./Menu/Menu"
import styles from './Body.module.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { LoggedAPI } from "../../Api/Api";
import { BodyProps_T } from "./types";
import LoadingScreen from './../LoadingScreen/LoadingScreen'
import LocalStorage from "../LocalStorage";


const Body = (props: BodyProps_T) => {
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => {
            let response = await LoggedAPI()
            if(response.status === 200) {
                props.Login_AC(response.data.email, response.data.name, response.data.lastName)
                LocalStorage.setToken(response.data.AccessToken)
                props.PullAllCardsThunk()
            }
        }
        a()
    }, [])
    useEffect(() => {
        if (props.isAuthorized === false) {
            navigate('/login')
        }
    }, [props.isAuthorized])
    if (props.isAuthorized === true) {
        return <div className={styles.body}>
            <Menu />
            <MainBody />
        </div>
    } else {
        return <LoadingScreen />
    }
}

export default Body