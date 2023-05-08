import MainBody from "./models/MainBody"; 
import Menu from "./models/Menu";
import styles from './lib/styles.module.css';
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {useState} from 'react'
import AuthCheck from "./processes/authCheck";
import MakeEmailWarning from "./models/ModalWarning";

const BodyPage = observer((props: {setError: (value: string) => void}) => {
    let [searchInput, setSearchInput] = useState('')
    // Проверка авторизации
    useEffect(() => {
        AuthCheck(props.setError)
    }, [])
    return <div className={styles.body}>
        <Menu setSearchInput={setSearchInput}/>
        <MainBody searchInput={searchInput} setError={props.setError}/>
        <MakeEmailWarning />
    </div>
})

export default BodyPage