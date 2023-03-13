import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import LocalStorage from "../Components/LocalStorage";
import { U_T } from "../Components/Redux/ReduxTypes";
import { addCardsAPI_T, LoggedAPI_T, LoginAPI_T, LogoutAPI_T, PullCardsAPI_T, SignInAPI_T } from "./types";

let token

const instanse = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
})

instanse.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${LocalStorage.AccessToken}`
    return config
})

instanse.interceptors.response.use((config: any) => {
    return config;
}, async (error) => {
    console.log(error.config)
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

export const MakeNewCardAPI = (text: string, groupID: number) => {
    return instanse.post('/cards',
        {
            text: text,
            groupsIDs: [groupID]
        },
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        })
}
export const LoginAPI: LoginAPI_T = async (login, password, remember, captchaToken) => {
    console.log('Login request')
    let response = await instanse.post('/auth/login', { login, password, remember, captchaToken })
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const DeleteUserAPI = async () => {
    console.log('DeleteUser request')
    let response = await instanse.delete('/auth/users')
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const LoggedAPI: LoggedAPI_T = async () => {
    console.log('LoggedIn request')
    let response = await instanse.get('/auth')
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const SignInAPI: SignInAPI_T = async (login, password, email, birthdate, name, lastName, phone, gender, captchaToken) => {
    let response = await instanse.post('/auth/signin', { login, password, email, birthdate, name, lastName, phone, gender, captchaToken })
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const LogoutAPI: LogoutAPI_T = async () => {
    console.log('Logout request')
    let response = await instanse.post('/auth/logout')
    let result = {
        status: response.status
    }
    return result
}
export const PullCardsAPI: PullCardsAPI_T = async () => {
    let response = await instanse.get(`/cards`)
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const addCardsAPI: addCardsAPI_T = async (cards) => {
    let response = await instanse.post(`/cards`, { cards })
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const deleteCardsAPI = (cards: Array<U_T["cardType"]>) => {
    return instanse.post(`/cards/delete`, { cards })
}
export const updateCardAPI = (cards: Array<U_T["cardType"]>) => {
    return instanse.put(`/cards`, { cards })
}
export const GetUsersAPI = () => {
    return instanse.get('/auth/users')
}
export const checkduplAPI = (value: string) => {
    return instanse.get(`/users/checkdupl/${value}`)
}






