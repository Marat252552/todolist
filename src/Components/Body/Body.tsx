import MainBody from "./MainBody/MainBody"
import Menu from "./Menu/Menu"
import styles from './Body.module.css';
import {BrowserRouter, useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import { LoggedAPI, PullCardsAPI } from "../../Api/Api";
import { loginType } from "../Redux/ReduxTypes";


const Body = (props: {isAuthorized: boolean, Login: (login: string, email: string, name: string, lastName: string) => loginType}) => {
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => {
            try {
                let res = await LoggedAPI()
                if(+res.status === 200) {
                    props.Login(res.data.login, res.data.email, res.data.name, res.data.lastName )
                }
            } catch(e) {
                console.log(e)
            }
        }
        a()
    }, [])
    useEffect(() => {
        let a = async () => {
            let cards = await PullCardsAPI()
            console.log(cards)
        }
        a()
    },[])
    useEffect(() => {
        if(props.isAuthorized === false) {
            navigate('/login')
        }
    }, [props.isAuthorized])
    return <div className={styles.body}>
        <Menu />        
            <MainBody />
    </div>
}

export default Body