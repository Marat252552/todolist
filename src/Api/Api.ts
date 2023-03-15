import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import LocalStorage from "../Components/Mobx/LocalStorage";
import { U_T } from "../Components/Redux/ReduxTypes";
import { addCardsAPI_T, AuthAPI_T, CardsAPI_T, deleteCardsAPI_T, DeleteUserAPI_T, GetUsersAPI_T, LoggedAPI_T, LoginAPI_T, LogoutAPI_T, PullCardsAPI_T, SignInAPI_T, updateCardsAPI_T, UsersAPI_T } from "./types";

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
})
// Interceptor, устанавливающий в headers каждого запроса AccessToken
instanse.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${LocalStorage.AccessToken}`
    return config
})

// Interceptor, отлавливающий ошибку, которую вызывает отсутствие AccessToken-а, и посылающий запрос на получение новой пары токенов
instanse.interceptors.response.use((config: any) => {
    return config;
}, async (error) => {
    const OriginalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        console.log('Refresh request')
        OriginalRequest._isRetry = true
        try {
            let response = await instanse.get('/auth/refresh')
            LocalStorage.setToken(response.data.AccessToken)
            return instanse.request(OriginalRequest)
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
})

export const CardsAPI: CardsAPI_T = {
    PullCards: async () => {
        let response = await instanse.get(`/cards`)
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    addCards: async (cards) => {
        let response = await instanse.post(`/cards`, { cards })
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    deleteCards: (cards: Array<U_T["cardType"]>) => {
        return instanse.post(`/cards/delete`, { cards })
    },
    updateCards: (cards: Array<U_T["cardType"]>) => {
        return instanse.put(`/cards`, { cards })
    }
}
export const AuthAPI: AuthAPI_T = {
    Login: async (login, password, remember, captchaToken) => {
        console.log('Login request')
        let response = await instanse.post('/auth/login', { login, password, remember, captchaToken })
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    Logged: async () => {
        console.log('LoggedIn request')
        let response = await instanse.get('/auth')
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    SignIn: async (login, password, email, birthdate, name, lastName, phone, gender, captchaToken) => {
        let response = await instanse.post('/auth/signin', { login, password, email, birthdate, name, lastName, phone, gender, captchaToken })
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    Logout: async () => {
        console.log('Logout request')
        let response = await instanse.post('/auth/logout')
        let result = {
            status: response.status
        }
        return result
    },
    checkdupl: (value: string) => {
        return instanse.get(`/auth/checkdupl/${value}`)
    }
}
export const UsersAPI: UsersAPI_T = {
    DeleteUser: async () => {
        console.log('DeleteUser request')
        let response = await instanse.delete('/auth/users')
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    GetUsers: () => {
        return instanse.get('/users')
    }
}






