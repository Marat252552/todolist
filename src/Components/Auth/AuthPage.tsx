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
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons"

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
                <button type="submit">Войти</button>
            </div>
        </form>
    }
    const LoginFormAnt = () => {
        const navigate = useNavigate()
        let [loading, setLoading] = useState(false)
        let [error, setError] = useState('')
        const onFinish = async (values: any) => {
            setLoading(true)
            try {
                let res = await LoginAPI(values.login, values.password)
                if (res.status === 200) {
                    LocalStorage.setUserData(res.data.name, res.data.lastName, res.data.email,)
                    LocalStorage.setToken(res.data.AccessToken)
                    LocalStorage.setIsAuthorized(true)
                }
            } catch (e: any) {
                setError(e.response.data)
            } finally {
                setLoading(false)
            }
        };
        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        return <div style={{ background: 'white', padding: '30px 50px 0 50px', borderRadius: '20px' }}>
            <Form
                name="normal_login"
                className={styles.loginForm}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="login"
                    rules={[{ required: true, message: 'Пожалуйста, введите Ваш логин!' }]}
                    validateStatus={(error)? 'error' : ''}
                    help={(error)? 'Неверный логин или пароль' : ''}
                >
                    <Input prefix={<UserOutlined className={styles.siteFormItemIcon} />} placeholder="Логин" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите Ваш пароль!' }]}
                    validateStatus={(error)? 'error' : ''}
                    help={(error)? 'Неверный логин или пароль' : ''}
                >
                    <Input
                        prefix={<LockOutlined className={styles.siteFormItemIcon} />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <a className={styles.loginFormForgot} href="">
                        Забыли пароль?
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className={styles.loginFormButton}>
                        Войти
                    </Button>
                    Или <a onClick={() => {navigate('/register')}}>создать аккаунт</a>
                </Form.Item>
            </Form>
        </div>
    }

    return <div className={styles.auth_page}>
        {/* <div className={styles.auth_form}> */}
        <LoginFormAnt />
        {/* </div> */}
    </div>
}

// const AuthPage2 = withAuthRedirect(AuthPage)

export default AuthPage