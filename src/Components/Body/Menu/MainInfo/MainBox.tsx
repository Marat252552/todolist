import styles from './MainBox.module.css'
import { Avatar } from 'antd'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { AppStateType } from '../../../Redux/Redux'
import { toggleSearch } from '../../../Redux/DataReducer'
import { connect } from 'react-redux'
import { MainBoxPropsType, MapDispatchType, MapStateType, SearchBoxPropsType } from './MainBoxTypes'

const InfoBox = () => {
    return <div className={styles.mainBoxInfo}>
        <Avatar className={styles.avatar} />
        <div className={styles.mainBoxInfoText}>
            <span>Name</span>
            <span>Name</span>
        </div>

    </div>
}

const SearchBox = (props: SearchBoxPropsType) => {
    return <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
            <Input className={styles.input} placeholder="Search" bordered={false} onFocus={()=> {props.toggleSearch(true)}} onBlur={() => {props.toggleSearch(false)}}/>
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
    </div>
}

const MainBox = (props: MainBoxPropsType) => {
    return <div className={styles.mainBox}>
        <InfoBox />
        <SearchBox toggleSearch={props.toggleSearch}/>
    </div>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isSearchOn: state.data.isSearchOn
    }
}

const MainBoxContainer = connect<MapStateType, MapDispatchType, unknown, AppStateType>(mapStateToProps, {toggleSearch})(MainBox)

export default MainBoxContainer