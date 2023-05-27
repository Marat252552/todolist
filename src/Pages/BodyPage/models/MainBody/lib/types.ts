import { Card_T } from "../../../../../Shared/Types/types"







export type MakeCardPropsType = {
    key: number,
    card: Card_T,
    showDrawer: any,
    setid: any
}

export type CreateNewCardPropsType = {
    setError: (value: string) => void
}

export type NewCardFormType = {
    setError: (value: string) => void
}

export type ChangeCardFormType = {
    card: Card_T,
    setError: (value: any) => void
}
