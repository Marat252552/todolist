import { AxiosResponse } from "axios";
import { U_T } from "../../../../../../../Shared/Types/typessss";

export type SetPhotoAPI_T = (formData: any) => Promise<AxiosResponse<any, any>>
export type DeleteUserAPI_T = () => Promise<{status: number, data: {message: string}}>
export type LogoutAPI_T = () => Promise<{status: number}>

export type CardsAPI_T = {
    addCards: addCardsAPI_T,
    deleteCards: deleteCardsAPI_T,
    updateCards: updateCardsAPI_T
}

export type addCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number, data: Array<{initialCardID: number, cardID: number}>}>

export type deleteCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number}>
export type updateCardsAPI_T = (cards: Array<U_T["cardType"]>) => Promise<{status: number}>