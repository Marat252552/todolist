import { Card_T } from "../../../Shared/Types/types"

export type Props_T = {
    setid: any,
    showDrawer: any,
    cards: {
        incompletedCards: Array<Card_T>,
        completedCards: Array<Card_T>
    },
}
