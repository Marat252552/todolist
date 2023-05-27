import { Button } from "antd"
import { Card_T } from "../../Shared/Types/types"
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"


const ButtonMyDay = (props: { groupsIDs: Array<number>, card: Card_T }) => {
    if (props.groupsIDs.find(el => el === 1)) {
        return <Button type="default" onClick={() => { Actions.deleteGroup(props.card, 1) }}>Убрать из представления Мой день</Button>
    } else {
        return <Button type="default" onClick={() => { Actions.addGroup(props.card, 1) }}>Добавить в представление мой день</Button>
    }
}

export default ButtonMyDay