import { instanse } from "../../../Shared/Api/Api"
import { resetPassword1_T } from "../lib/types"

export const resetPassword_1: resetPassword1_T = async (login: string) => {
    return instanse.post('/auth/resetmypassword', {login})
}