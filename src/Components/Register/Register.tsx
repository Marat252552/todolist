import { Field, FormikProvider, useFormik } from "formik"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkduplAPI, LoggedAPI, SignInAPI } from "../../Api/Api"
import LocalStorage from "../LocalStorage"
import styles from './Register.module.css'
import { RegisterProps_T } from "./types"
import { useState } from 'react'
import type { CascaderProps } from 'antd';
import ReCAPTCHA from "react-google-recaptcha"
import { DatePicker, AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, } from 'antd';

let Errors = {
    email: (value: string) => {
        let error
        if (!value) {
            error = 'Не введен email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Неверный email';
        }
        return error;
    },
    login: (value: string) => {
        let error;
        if (!value) {
            error = 'Не введен логин'
        }
        return error;
    },
    password: (value: string, password2: string) => {
        let error;
        if (!value) {
            error = 'Не введен пароль'
        }
        if (value !== password2) {
            error = 'Пароли не совпадают'
        }
        return error;
    }
}

const Register = (props: RegisterProps_T) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (props.isAuthorized === true) {
            navigate('/home')
        }
    }, [props.isAuthorized])
    const RegisterForm = () => {
        let [error, setError] = useState('')
        const formik = useFormik({
            initialValues: {
                login: '',
                password: '',
                password2: '',
                email: '',
                age: '',
                name: '',
                lastName: ''
            },
            onSubmit: async (values: any, { resetForm }: any) => {
                try {
                    let res = await SignInAPI(values.login, values.password, values.email, values.age, values.name, values.lastName)
                    if (res.status === 201) {
                        let res = await LoggedAPI()
                        if (+res.status === 200) {
                            LocalStorage.setUserData(res.data.name, res.data.lastName, res.data.email,)
                            LocalStorage.setToken(res.data.AccessToken)
                            LocalStorage.setIsAuthorized(true)
                        }
                    }
                } catch (e: any) {
                    if (e.response.status === 400) {
                        setError(e.response.data)
                    }
                }

            },
        })
        return <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.login_form}>
                    <span>{error}</span>
                    {(formik.errors.login && formik.touched.login) ? <span>{formik.errors.login}</span> : <span></span>}
                    <Field
                        className={styles.input}
                        placeholder='Введите имя'
                        id="name"
                        name='name'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    ></Field>
                    <Field
                        className={styles.input}
                        placeholder='Введите фамилию'
                        id="lastName"
                        name='lastName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    ></Field>
                    <Field
                        className={styles.input}
                        placeholder='Введите логин'
                        id="login"
                        name='login'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.login}
                        validate={Errors.login}
                    />
                    {(formik.errors.password && formik.touched.password) ? <span>{formik.errors.password}</span> : <span></span>}
                    <Field
                        className={styles.input}
                        placeholder='Введите пароль'
                        id="password"
                        name='password'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        validate={(value: any) => Errors.password(value, formik.values.password2)}
                    />
                    {(formik.errors.password && formik.touched.password) ? <span>{formik.errors.password}</span> : <span></span>}
                    <Field
                        className={styles.input}
                        placeholder='Повторите пароль'
                        id="password2"
                        name='password2'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.password2}
                    />
                    {(formik.errors.email && formik.touched.email) ? <span>{formik.errors.email}</span> : <span></span>}
                    <Field
                        className={styles.input}
                        placeholder='Введите email'
                        id="email"
                        name='email'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        validate={Errors.email}
                    />

                    <Field
                        className={styles.input}
                        placeholder='Введите возраст'
                        id="age"
                        name='age'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    <button type='submit'>Создать аккаунт</button>
                </div>
            </form>
        </FormikProvider>
    }
    const RegisterFormAnt = () => {
        let [captchaToken, setCaptchaToken] = useState('')
        let [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false)
        let [emailError, setEmailError] = useState('')
        let [loginError, setLoginError] = useState('')
        let [loading, setLoading] = useState(false)
        const [form] = Form.useForm();
        const onChange = (value: string) => {
            setIsCaptchaSuccess(true)
            setCaptchaToken(value)
        }
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
        const onFinish = async (values: any) => {
            setLoading(true)
            try {
                let res = await SignInAPI(values.login, values.password, values.email, values.birthdate, values.name, values.lastName, values.phone, values.gender, captchaToken)
                if (res.status === 201) {
                    let res = await LoggedAPI()
                    if (+res.status === 200) {
                        LocalStorage.setUserData(res.data.name, res.data.lastName, res.data.email,)
                        LocalStorage.setToken(res.data.AccessToken)
                        LocalStorage.setIsAuthorized(true)
                    }
                }
            } catch (e: any) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        };
        const checkDupl = async (values: any) => {
            if (values.email) {
                try {
                    await checkduplAPI(values.email)
                    setEmailError('')
                } catch (e: any) {
                    if (e.response.status) { setEmailError(e.response.data) }
                }
            }
            if (values.login) {
                try {
                    await checkduplAPI(values.login)
                    setLoginError('')
                } catch (e: any) {
                    if (e.response.status) { setLoginError(e.response.data) }
                }
            }




        }
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }}>
                    <Option value="7">+7</Option>
                </Select>
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
                    <Select placeholder="Укажите Ваш пол">
                        <Option value={1}>Мужчина</Option>
                        <Option value={0}>Женщина</Option>
                    </Select>
                </Form.Item>

                {/* Запомнить меня */}
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
                        onChange={onChange}
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
}

export default Register