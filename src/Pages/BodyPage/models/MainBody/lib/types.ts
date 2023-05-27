import { T_cT, U_T } from './../../../../../Shared/Types/typessss';







export type MakeCardPropsType = {
    key: number,
    card: U_T["cardType"],
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
    card: U_T["cardType"],
    setError: (value: any) => void
}
