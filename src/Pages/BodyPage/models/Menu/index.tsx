import CardsInfo from "./models/CardsInfo"
import MainBox from "./models/MainInfo"; 
import styles from './lib/styles.module.css'
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