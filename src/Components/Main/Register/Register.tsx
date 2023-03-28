import { useEffect } from "react"
import { AuthAPI } from "../../Side/API/Api"
import LocalStorage from "../../Side/Mobx/LocalStorage"
import styles from './Register.module.css'
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"
import { DatePicker, Button, Checkbox, Form, Input, Select, } from 'antd';
import { observer } from "mobx-react-lite"
import { message } from 'antd';
import { SigninErrorHandler } from "../ErrorHandlers/AuthErrorHandlers"
import { LoggedController } from "../Controllers/AuthControllers"

const Register = observer((props: {setError: (value: string) => void}) => {
    // Проверка авторизации
    useEffect(() => {
        LoggedController(props.setError)
    }, [])
    // Форма регистрации
    const RegisterFormAnt = () => {
        // Результат капчи
        let [captchaToken, setCaptchaToken] = useState('')
        let [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false)
        // Ошибка почты - такая почта уже используется
        let [emailError, setEmailError] = useState('')
        // Ошибка логина - такой логин уже существует
        let [loginError, setLoginError] = useState('')
        // Загрузка после отправки формы
        let [loading, setLoading] = useState(false)
        const [form] = Form.useForm();
        // Callback капчи
        const onChange = (value: string) => {
            setIsCaptchaSuccess(true)
            setCaptchaToken(value)
        }
        // Далее настройки формы
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const onFinish = async (v: any) => {
            setLoading(true)
            try {
                let res = await AuthAPI.SignIn(v.login, v.password, v.email, v.birthdate, v.name, v.lastName, v.phone, v.gender, captchaToken)
                if (res.status === 201) {
                    LoggedController(props.setError)
                }
            } catch (e: any) {
                props.setError(e?.response?.data?.message)
            } finally {
                setLoading(false)
            }
        };
        const checkDupl = async (values: any) => {
            if (values.email) {
                try {
                    await AuthAPI.checkdupl(values.email)
                    setEmailError('')
                } catch (e: any) {
                    if (e.response.status) { setEmailError(e.response.data) }
                }
            }
            if (values.login) {
                try {
                    await AuthAPI.checkdupl(values.login)
                    setLoginError('')
                } catch (e: any) {
                    if (e.response.status) { setLoginError(e.response.data) }
                }
            }
        }
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select options={[{value: '7', label: '+7'}]} style={{ width: 70 }} />
            </Form.Item>
        );
        return (
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ prefix: '+7' }}
                style={{ maxWidth: 600 }}
                onValuesChange={checkDupl}
                scrollToFirstError
            >
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {/* Адрес почты */}
                <Form.Item
                    name="email"
                    label="Адрес почты"
                    validateStatus={(emailError) ? 'error' : ''}
                    help={(emailError) ? 'Данный email уже используется' : ''}
                    rules={[
                        {
                            type: 'email',
                            message: 'Указанный адрес недействителен',
                        },
                        {
                            required: true,
                            message: 'Пожалуйста, введите адрес вашей почты',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Имя */}
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите имя',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Фамилия */}
                <Form.Item
                    name="lastName"
                    label="Фамилия"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите фамилию',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Пароль */}
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите ваш пароль',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                {/* Проверка пароля */}
                <Form.Item
                    name="confirm"
                    label="Проверка"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, подтвердите пароль',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {/* Логин пользователя */}
                <Form.Item
                    name="login"
                    label="Пользователь"
                    tooltip="Так Вас буду видеть другие"
                    validateStatus={(loginError) ? 'error' : ''}
                    help={(loginError) ? 'Логин занят' : ''}
                    rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                {/* Дата рождения */}
                <Form.Item label="Дата рождения" name="birthdate">
                    <DatePicker />
                </Form.Item>

                {/* Номер телефона */}
                <Form.Item
                    name="phone"
                    label="Номер телефона"
                    rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>

                {/* Пол */}
                <Form.Item
                    name="gender"
                    label="Пол"
                    rules={[{ required: true, message: 'Пожалуйста, укажите Ваш пол' }]}
                >
                    <Select options={[{value: '1', label: 'Мужчина'}, {value: '2', label: 'Женщина'}]} placeholder="Укажите Ваш пол" />
                </Form.Item>
                {/* <Form.Item
                    name="img"
                    label="Аватарка"
                >
                    <Input type="file" style={{ width: '100%' }} />
                </Form.Item> */}
                {/* Условия соглашения */}
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Необходимо согласие')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        Я прочитал <a href="">соглашение</a>
                    </Checkbox>
                </Form.Item>

                {/* Капча */}
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ReCAPTCHA
                        sitekey='6LcGzPokAAAAALlIR_f1wcHP9FuMWSIghMN4OKu_'
                        onChange={(value: any) => {onChange(value)}}
                    />
                </div>

                {/* Кнопка "создать аккаунт" */}
                <Form.Item {...tailFormItemLayout}>
                    <Button disabled={!isCaptchaSuccessful} type="primary" htmlType="submit" loading={loading}>
                        Создать аккаунт
                    </Button>
                </Form.Item>
            </Form>
        );
    }
    return <div className={styles.auth_page}>
        <div className={styles.auth_form}>
            <p></p>
            <br></br>
            <RegisterFormAnt />
        </div>
    </div>
})

export default Register