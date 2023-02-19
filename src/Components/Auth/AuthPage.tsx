import { Button, Input } from "antd"
import { useFormik } from "formik"
import React from "react"
import styles from './AuthPage.module.css'


const AuthPage = (props: any) => {
    const LoginForm = () => {
        const formik = useFormik({
            initialValues: {
                login: '',
                password: ''
            },
            onSubmit: (values: any, { resetForm }: any) => {
                console.log('submit')
                props.loginThunk(values.login, values.password)
            },
        })
        return <form onSubmit={formik.handleSubmit}>
            <div className={styles.login_form}>
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
    const SignInForm = () => {

    }
    return <div className={styles.auth_page}>
        <div className={styles.auth_form}>
            <LoginForm />
        </div>
    </div>
}

export default AuthPage