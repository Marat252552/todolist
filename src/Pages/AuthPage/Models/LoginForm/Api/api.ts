import { instanse } from "../../../../../Shared/Api/Api"
import { LoginAPI_T } from "../../../Lib/types"

export const Login: LoginAPI_T = async (login, password, remember) => {
    let response = await instanse.post('/auth/login', { login, password, remember })
    let result = {
        status: response.status,
        data: response.data
    }
    return result
}