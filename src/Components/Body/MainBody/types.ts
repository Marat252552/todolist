import { T_cT, U_T } from "../../Redux/ReduxTypes"







export type MakeCardPropsType = {
    SetMessageError: (value: string) => void,
    key: number,
    card: U_T["cardType"]
}

export type CreateNewCardPropsType = {
    SetMessageError: (value: string) => void
}

export type NewCardFormType = {
    SetMessageError: (value: string) => void
}

export type ChangeCardFormType = {
    text: string,
    cardID: number,
    isCompleted: boolean,
}
