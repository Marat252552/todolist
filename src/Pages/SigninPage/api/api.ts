import { instanse } from "../../../Shared/Api/Api"
import { AuthAPI_T } from "../lib/types"

export const AuthAPI: AuthAPI_T = {
    SignIn: async (login, password, email, birthdate, name, lastName, phone, gender) => {
        let response = await instanse.post('/auth/signin', { login, password, email, birthdate, name, last_name: lastName, phone, gender })
        let result = {
            status: response.status,
            data: response.data
        }
        return result
    },
    checkdupl: (value: string) => {
        return instanse.get(`/auth/checkdupl/${value}`)
    }
}