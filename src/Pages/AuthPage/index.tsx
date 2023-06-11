import { useEffect } from "react"
import styles from './Lib/styles.module.css'
import { LoggedController } from "../../Shared/Features/features"
import LoginForm from "./Models/LoginForm"


const AuthPage = (props: {setError: (value: string) => void}) => {
    // Проверка авторизации
    useEffect(() => {
        LoggedController(props.setError)
    }, [])
    // Форма логина
    
    return <div className={styles.auth_page}>
        <LoginForm setError={props.setError}/>
    </div>
}

export default AuthPage