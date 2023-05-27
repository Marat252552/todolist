import Actions from "../../Pages/BodyPage/models/MainBody/Helpers/Actions"
import { Button } from "antd"

const ButtonDeleteCard = (props: { _id: string}) => {
    console.log(props._id)
    return <Button
        danger
        type='primary'
        style={{ width: '100px' }}
        onClick={async () => {
            Actions.deleteCard(props._id)
        }}>
        Удалить
    </Button>
}

export default ButtonDeleteCard