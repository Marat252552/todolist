import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Checkbox, Form, Input } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LocalStorage from "../../../../App/state/LocalStorage"
import styles from './Lib/styles.module.css'

const LoginForm = (props: {setError: (value: string) => void}) => {
    const navigate = useNavigate()
    // Загрузка кнопки "войти" после отправки формы
    let [loading, setLoading] = useState(false)
    // Callback, который вызывается на отправку формы
    const onFinish = async (values: any) => {
        setLoading(true)
        if(true) {
            LocalStorage.setUserData('Иван', 'Иванов', 'IvanIvanov@mandex.ru', '')
                LocalStorage.setIsAuthorized(true)
                LocalStorage.setNotedAboutActivated(false)
                LocalStorage.setIsActivated(true)
        }
    };
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
                initialValue='user'
                rules={[{ required: true, message: 'Пожалуйста, введите Ваш логин!' }]}
            >
                <Input prefix={<UserOutlined className={styles.siteFormItemIcon} />} placeholder="Логин" />
            </Form.Item>

            {/* Пароль */}
            <Form.Item
                initialValue='qwerty'
                name="password"
                rules={[{ required: true, message: 'Пожалуйста, введите Ваш пароль!' }]}
            >
                <Input
                    prefix={<LockOutlined className={styles.siteFormItemIcon} />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>


            {/* Кнопка "войти" */}
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className={styles.loginFormButton}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default LoginForm