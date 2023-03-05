import { connect } from "react-redux/es/exports"
import CardsInfo from "./CardsInfo/CardsInfo"
import MainBox from "./MainInfo/MainBox"
import styles from './Menu.module.css'
import { AppStateType } from "../../Redux/Redux"
import { MapDispatchType, MapStateType, MenuPropsType } from "./MenuTypes"
import { changeCurrentCardGroupID_AC } from "../../Redux/ActionCreators"
import { switchCardGroup_Thunk } from "../../Redux/Thunks"


const Menu = (props: MenuPropsType) => {
    return <div className={styles.menu}>
        <MainBox/>
        <CardsInfo switchCardGroup_Thunk={props.switchCardGroup_Thunk} menuCardGroups={props.menuCardGroups} changeCurrentCardGroupID_AC={props.changeCurrentCardGroupID_AC}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        menuCardGroups: state.data.menuCardGroups
    }
}

const MenuContainer = connect<MapStateType, MapDispatchType, void, AppStateType>(mapStateToProps, {changeCurrentCardGroupID_AC, switchCardGroup_Thunk})(Menu);

export default MenuContainer