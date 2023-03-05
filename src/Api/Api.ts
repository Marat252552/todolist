import axios, { AxiosResponse } from "axios";
import { LoggedAPI_T, LoginAPI_T } from "./types";

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
    let data = response.data
    let result = {
        status: response.status,
        data: data
    }
    return result
}
export const LoggedAPI: LoggedAPI_T = async () => {
    let response = await instanse.get('/auth')
    let data = response.data
    let result = {
        status: response.status,
        data: data
    }
    return result
}
export const SignInAPI = (login: string, password: string, email: string, age: number, name: string, lastName: string) => {
    return instanse.post('/auth/signin', {login: login, password: password, email: email, age: age, name: name, lastName: lastName})
}
export const LogoutAPI = async () => {
    return await instanse.post('/auth/logout')
}
export const PullCardsAPI = () => {
    return instanse.get(`/cards`)
}
export const addCardAPI = (text: string, groupID: string) => {
    return instanse.post(`/cards`, {text: text, groupID: groupID})
}
export const deleteCardAPI = (cardID: string) => {
    return instanse.delete(`/cards/${cardID}`)
}

export const GetUsersAPI = () => {
    return instanse.get('/auth/users')
}






