import { Button } from "antd"
import { toJS } from "mobx"
import CardsState from "../../App/state/CardsState"
import { DeploymentUnitOutlined } from "@ant-design/icons"
import { Props_T } from "./lib/types"
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"

const DrawerMyDay = (props: Props_T) => {
    if (props.observableid === '') {
        return <div></div>
    }
    let card = toJS(CardsState.allCards.find(card => card._id === props.observableid))
    if (!card) {
        return <div></div>
    }
    if (card!.groupsIDs.find(el => el === '1')) {
        return <Button icon={<DeploymentUnitOutlined style={{ fontSize: '18px', color: 'rgb(149, 188, 206)',  width: '100%' }} />} type="default" onClick={() => { Actions.deleteGroup(card!, '1') }}>Убрать из представления "Мой день"</Button>
    } else {
        return <Button icon={<DeploymentUnitOutlined style={{ fontSize: '18px', color: 'rgb(149, 188, 206)', width: '100%' }} />} type="default" onClick={() => { Actions.addGroup(card!, '1') }}>Добавить в представление "Мой день"</Button>
    }
}

export default DrawerMyDay