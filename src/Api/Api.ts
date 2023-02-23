import axios from "axios";

const instanse = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
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
        'Content-Type': 'application/json',
        },
    })
}

export const LoginAPI = async (login: string, password: string) => {
    return await instanse.post('/login', {login: login, password: password})
}
export const LogoutAPI = async () => {
    return await instanse.delete('/logout')
}



