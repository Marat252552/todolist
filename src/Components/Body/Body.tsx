import MainBody from "./MainBody/MainBody"
import Menu from "./Menu/Menu"
import styles from './Body.module.css';
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import { LoggedAPI } from "../../Api/Api";
import { BodyProps_T } from "./types";


const Body = (props: BodyProps_T) => {
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => {
            try {
                let res = await LoggedAPI()
                if(+res.status === 200) {
                    props.Login_AC(res.data.email, res.data.name, res.data.lastName)
                    props.PullAllCardsThunk()
                }
            } catch(e) {
                console.log(e)
            }
        }
        a()
    }, [])
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