import { Card_T } from "../../../Shared/Types/types";

export type PullCardsAPI_T = () => Promise<{status: number, data: Array<Card_T>}>