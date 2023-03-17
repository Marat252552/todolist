import { U_T } from "../../../Redux/ReduxTypes"


export type Actions_T = {
    addGroup: (card: U_T["cardType"], groupID: number, SetMessageError: (value: string) => void) => Promise<void>,
    deleteGroup: (card: U_T["cardType"], groupID: number, SetMessageError: (value: string) => void) => Promise<void>,
    completeCard: (card: U_T["cardType"], SetMessageError: (value: string) => void) => Promise<void>,
    incompleteCard: (card: U_T["cardType"], SetMessageError: (value: string) => void) => Promise<void>,
    deleteCard: (cardID: number, SetMessageError: (value: string) => void, helper?: () => any) => Promise<void>,
    addCard: (text: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    changeCardText: (card: U_T["cardType"], text: string, SetMessageError: (value: string) => void) => Promise<void>,
    createGroup: (groupID: number, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    deleteCardGroup: (groupID: number, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    updateCardGroup: (groupID: number, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
}