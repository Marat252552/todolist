import { Button, Input } from "antd"
import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LoggedAPI, LoginAPI } from "../../Api/Api"
import { withAuthRedirect } from "../hoc/withRouter"
import LocalStorage from "../LocalStorage"
import styles from './AuthPage.module.css'
import { AuthPagePropsType } from "./types"
import { Carousel } from 'antd';
import man from './../../Media/man.jpg'

const AuthPage = (props: AuthPagePropsType) => {
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => {
            let response = await LoggedAPI()
            if (response.status === 200) {
                LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                LocalStorage.setToken(response.data.AccessToken)
                LocalStorage.setIsAuthorized(true)
            }
        }
        a()
    }, [])
    const LoginForm = () => {
        let [error, setError] = useState('')
        const formik = useFormik({
            initialValues: {
                login: '',
                password: '',
                name: '',
                lastName: ''
            },
            onSubmit: async (values: any) => {
                try {
                    let res = await LoginAPI(values.login, values.password)
                    if (res.status === 200) {
                        LocalStorage.setUserData(res.data.name, res.data.lastName, res.data.email,)
                        LocalStorage.setToken(res.data.AccessToken)
                        LocalStorage.setIsAuthorized(true)
                    }
                } catch (e: any) {
                    setError(e.response.data)
                }
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
    const contentStyle: React.CSSProperties = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return <div className={styles.auth_page}>
        <div className={styles.auth_form}>
            <div style={{height: '100%'}}>
                <LoginForm />
                <div className={styles.buttons}>
                    <button>Forgot Password?</button>
                    <button onClick={() => { navigate('/register') }}>Sign in</button>
                    <button>Forgot Password?</button>
                </div>
            </div>
            <div className={styles.fill}>
                <img src={man} alt="" />
            </div>
        </div>

    </div>
}

// const AuthPage2 = withAuthRedirect(AuthPage)

export default AuthPage