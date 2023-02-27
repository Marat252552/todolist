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
    return instanse.post('/login', {login: login, password: password})
}
export const LoggedAPI = () => {
    return instanse.get('/login')

}
export const TestAPI = () => {
    return instanse.get('/testing')
}

export const LogoutAPI = async () => {
    return await instanse.post('/logout')
}




