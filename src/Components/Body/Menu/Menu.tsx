import { connect } from "react-redux/es/exports"
import CardsInfo from "./CardsInfo/CardsInfo"
import MainBox from "./MainInfo/MainBox"
import styles from './Menu.module.css'
import { AppStateType } from "../../Redux/Redux"
import { MapDispatchType, MapStateType, MenuPropsType } from "./MenuTypes"
import { changeCurrentCardGroupID_AC } from "../../Redux/ActionCreators"
import { switchCardGroup_Thunk } from "../../Redux/Thunks"
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

const mapStateToProps = (state: AppStateType) => {
    return {
        menuCardGroups: state.data.menuCardGroups
    }
}

const MenuContainer = connect<MapStateType, MapDispatchType, void, AppStateType>(mapStateToProps, {changeCurrentCardGroupID_AC, switchCardGroup_Thunk})(Menu);

export default MenuContainer