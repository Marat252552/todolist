import axios from "axios";

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

export const LoginAPI = (login: string, password: string) => {
    return instanse.post('/auth/login', {login: login, password: password})
}
export const LoggedAPI = () => {
    return instanse.get('/auth/login')
}
export const SignInAPI = (login: string, password: string, email: string, age: number) => {
    return instanse.post('/auth/signin', {login: login, password: password, email: email, age: age})
}
export const LogoutAPI = async () => {
    return await instanse.post('/auth/logout')
}
export const PullCardsAPI = (id: string) => {
    return instanse.get(`/cards/${id}`)
}




