import { Card_T } from "../../../../../Shared/Types/types"


export type Actions_T = {
    addGroup: (card: Card_T, groupID: string) => Promise<void>,
    deleteGroup: (card: Card_T, groupID: string) => Promise<void>,
    completeCard: (card: Card_T) => Promise<void>,
    incompleteCard: (card: Card_T) => Promise<void>,
    deleteCard: (id: string) => Promise<void>,
    addCard: (content: string) => Promise<void>,
    changeCardText: (card: Card_T, content: string) => Promise<void>,
    createGroup: (groupID: string, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    deleteCardGroup: (groupID: string, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    updateCardGroup: (groupID: string, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
}