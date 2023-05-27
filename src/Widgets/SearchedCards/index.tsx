import CardsState from "../../App/state/CardsState"
import Card from "../Card"
import { Props_T } from "./lib/types"

const SearchedCards = (props: Props_T) => {
    return <div>{CardsState.allCards.filter(card => {
        return card.content.includes(props.searchInputValue)
    }).map(card => {
        return <Card setid={props.setid} showDrawer={props.showDrawer} card={card} key={card._id} />
    })}</div>
}

export default SearchedCards