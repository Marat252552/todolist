import LocalStorage from "../../App/state/LocalStorage"
import { LoggedAPI } from "../Api/Api"

export const LoggedController = (setError: (value: string) => void) => {
    try {
        let a = async () => {
            let response = await LoggedAPI()
            if (response.status === 200) {
                LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                LocalStorage.setIsAuthorized(true)
            }
        }
        a()
    } catch(e :any) {
        setError(e.response.data.message)
    }
}