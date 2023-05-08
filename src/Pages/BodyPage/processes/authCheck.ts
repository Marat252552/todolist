import LocalStorage from "../../../App/state/LocalStorage"
import { LoggedAPI } from "../../../Shared/Api/Api"
import { PullAllCards_Thunk, PullAllGroups_Thunk } from "./Thunks"

let AuthCheck = async (setError: any) => {
    try {
        let response = await LoggedAPI()
        if (response.status === 200) {
            LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email, response.data.imgSRC)
            LocalStorage.setIsAuthorized(true)
            PullAllCards_Thunk()
            PullAllGroups_Thunk()
            if (response.data.isActivated === false) {
                LocalStorage.setNotedAboutActivated(false)
            }
            LocalStorage.setIsActivated(response.data.isActivated)
        } else {
            LocalStorage.setIsAuthorized(false)
            LocalStorage.setToken('')
        }
    } catch (e: any) {
        if (e.response.status === 401) {
            LocalStorage.setIsAuthorized(false)
            LocalStorage.setToken('')
        }
    }
}

export default AuthCheck