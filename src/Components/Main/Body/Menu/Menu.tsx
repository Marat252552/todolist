import CardsInfo from "./CardsInfo/CardsInfo"
import MainBox from "./MainInfo/MainBox"
import styles from './Menu.module.css'
import { message } from 'antd';

const Menu = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const SetMessageError = (value: string) => {
        messageApi.open({
            type: 'error',
            content: value,
        });
    }
    return <div className={styles.menu}>
        {contextHolder}
        <MainBox/>
        <CardsInfo SetMessageError={SetMessageError}/>
    </div>
}

export default Menu