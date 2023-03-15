import { U_T } from "../../../Redux/ReduxTypes"


export type Actions_T = {
    addGroup: (card: U_T["cardType"], groupID: number, SetMessageError: (value: string) => void) => Promise<void>,
    deleteGroup: (card: U_T["cardType"], groupID: number, SetMessageError: (value: string) => void) => Promise<void>,
    completeCard: (card: U_T["cardType"], SetMessageError: (value: string) => void) => Promise<void>,
    incompleteCard: (card: U_T["cardType"], SetMessageError: (value: string) => void) => Promise<void>
}