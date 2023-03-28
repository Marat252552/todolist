import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Input, Checkbox, Button, Form } from "antd"
import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from "react-router-dom"
import { sitekey } from "../../../../env"
import { AuthAPI } from "../../Side/API/Api"
import LocalStorage from "../../Side/Mobx/LocalStorage"
import { LoggedController } from "../Controllers/AuthControllers"
import styles from './ForgotMyPassword.module.css'

const ForgotMyPassword = (props: {setError: (value: string) => void, setSuccess: (value: string) => void}) => {
    // Проверка авторизации
    useEffect(() => {
        LoggedController(props.setError)
    }, [])
    // Форма логина
    const LoginFormAnt = () => {
        // Значение капчи
        let [captchaToken, setCaptchaToken] = useState('')
        let [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false)
        // Загрузка кнопки "войти" после отправки формы
        let [loading, setLoading] = useState(false)
        // Callback, который вызывается на отправку формы
        const onFinish = async (values: any) => {
            setLoading(true)
            try {
                await AuthAPI.resetPassword_1(values.login)
            } catch (e: any) {
                console.log(e)
                props.setError(e.response.data.message)
            } finally {
                setLoading(false)
            }
        };
        // Callback, который вызывает выполнение капчи
        const onChange = (value: string) => {
            setIsCaptchaSuccess(true)
            setCaptchaToken(value)
        }
        return <div style={{ background: 'white', padding: '30px 50px 0 50px', borderRadius: '20px' }}>
            <Form
                name="normal_login"
                className={styles.loginForm}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {/* Логин */}
                <Form.Item
                    name="login"
                    rules={[{ required: true, message: 'Пожалуйста, введите Ваш логин!' }]}
                >
                    <Input prefix={<UserOutlined className={styles.siteFormItemIcon} />} placeholder="Логин" />
                </Form.Item>

                {/* Капча */}
                <ReCAPTCHA
                    sitekey={sitekey}
                    onChange={(value: any) => { onChange(value) }}
                />

                {/* Кнопка "Подтвердить" */}
                <Form.Item>
                    <Button disabled={!isCaptchaSuccessful} type="primary" htmlType="submit" loading={loading} className={styles.loginFormButton}>
                        Подтвердить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
    return <div className={styles.auth_page}>
        <LoginFormAnt />
    </div>
}

export default ForgotMyPassword