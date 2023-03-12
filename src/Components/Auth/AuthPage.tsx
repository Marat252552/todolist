import { Button, Input } from "antd"
import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoggedAPI, LoginAPI } from "../../Api/Api"
import { withAuthRedirect } from "../hoc/withRouter"
import LocalStorage from "../LocalStorage"
import styles from './AuthPage.module.css'
import { AuthPagePropsType } from "./types"

const AuthPage = (props: AuthPagePropsType) => {
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => {
            let response = await LoggedAPI()
            if(response.status === 200) {
                props.Login_AC(response.data.email, response.data.name, response.data.lastName)
                LocalStorage.setToken(response.data.AccessToken)
                LocalStorage.setIsAuthorized(true)
            }
        }
        a()
    }, [])
    const LoginForm = () => {
        let [error, setError] = useState('')
        let navigate = useNavigate()
        const formik = useFormik({
            initialValues: {
                login: '',
                password: '',
                name: '',
                lastName: ''
            },
            onSubmit: async (values: any) => {
                props.login_Thunk(values.login, values.password)
            },
        })
        return <form onSubmit={formik.handleSubmit}>
            <div className={styles.login_form}>
                <div>{error}</div>
            <Input
                className={styles.input}
                placeholder='Введите логин'
                id="login"
                name='login'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.login}
            ></Input>
            <Input
                className={styles.input}
                placeholder='Введите пароль'
                id="password"
                name='password'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.password}
            ></Input>
            <button type='submit'>Войти</button>
            </div>
        </form>
    }
    return <div className={styles.auth_page}>
        <div className={styles.auth_form}>
            <button onClick={() => {navigate('/register')}}>Sign in</button>
            <LoginForm />
        </div>
    </div>
}

// const AuthPage2 = withAuthRedirect(AuthPage)

export default AuthPage