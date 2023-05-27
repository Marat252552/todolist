import { DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"

const ButtonDrawerDeleteCard = (props: { observableid: string, onClose: any }) => {
    props.onClose()
    return <Button icon={<DeleteOutlined />} onClick={async () => {
        Actions.deleteCard(props.observableid)
    }}></Button>
}

export default ButtonDrawerDeleteCard