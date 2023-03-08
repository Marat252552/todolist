import axios, { AxiosResponse } from "axios";
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
export const LoginAPI: LoginAPI_T = async (login, password) => {
    let response = await instanse.post('/auth/login', {login: login, password: password})
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const LoggedAPI: LoggedAPI_T = async () => {
    let response = await instanse.get('/auth')
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const SignInAPI: SignInAPI_T = async (login, password, email, age, name, lastName) => {
    let response = await instanse.post('/auth/signin', {login: login, password: password, email: email, age: age, name: name, lastName: lastName})
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const LogoutAPI: LogoutAPI_T = async () => {
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
    let response = await instanse.post(`/cards`, {cards})
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}
export const deleteCardsAPI = (cards: Array<U_T["cardType"]>) => {
    console.log(1111)
    return instanse.post(`/cards/delete`, {cards})
}
export const updateCardAPI = (cards: Array<U_T["cardType"]>) => {
    return instanse.put(`/cards`, {cards})
}

export const GetUsersAPI = () => {
    return instanse.get('/auth/users')
}






