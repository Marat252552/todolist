import { Button, Input } from "antd"
import { Field, FormikProvider, useFormik } from "formik"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LoggedAPI, SignInAPI } from "../../Api/Api"
import styles from './Register.module.css'

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

const Register = (props: any) => {
    const RegisterForm = () => {
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
                let res = await SignInAPI(values.login, values.password, values.email, values.age, values.name, values.lastName)
                if (res.status === 201) {
                    let res = await LoggedAPI()
                    console.log(res)
                    if (+res.status === 200) {
                        console.log(res)
                        props.Login('fea', 'dwa')
                    }
                }
            },
        })
        return <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.login_form}>
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
    return <div className={styles.auth_page}>
        <div className={styles.auth_form}>
            <RegisterForm />
        </div>
    </div>
}

export default Register