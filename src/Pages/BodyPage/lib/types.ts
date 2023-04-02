import { U_T } from "../../../Shared/Types/typessss";

export type PullCardsAPI_T = () => Promise<{status: number, data: Array<U_T["cardType"]>}>