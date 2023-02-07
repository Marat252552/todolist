import { connect } from "react-redux/es/exports"
import CardsInfo from "./CardsInfo/CardsInfo"
import MainBox from "./MainInfo/MainBox"
import styles from './Menu.module.css'
import {changeCurrentCardGroupID} from '../../Redux/DataReducer'


const Menu = (props: any) => {
    return <div className={styles.menu}>
        <MainBox/>
        <CardsInfo data={props.data} changeCurrentCardGroupID={props.changeCurrentCardGroupID}/>
    </div>
}

const mapStateToProps = (state: any) => {
    return {
        data: state.data
    }
}

const MenuContainer = connect(mapStateToProps, {changeCurrentCardGroupID})(Menu);

export default MenuContainer