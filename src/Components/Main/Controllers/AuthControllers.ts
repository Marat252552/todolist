import { AuthAPI } from "../../Side/API/Api"
import LocalStorage from "../../Side/Mobx/LocalStorage"


export const LoggedController = (setError: (value: string) => void) => {
    try {
        let a = async () => {
            let response = await AuthAPI.Logged()
            if (response.status === 200) {
                LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                LocalStorage.setToken(response.data.AccessToken)
                LocalStorage.setIsAuthorized(true)
            }
        }
        a()
    } catch(e :any) {
        setError(e.response.data.message)
    }
}
