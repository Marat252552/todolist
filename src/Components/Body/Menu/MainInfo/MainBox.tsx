import styles from './MainBox.module.css'
import { Avatar } from 'antd'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { AppStateType } from '../../../Redux/Redux'
import { toggleSearch, updateSearchInputValue } from '../../../Redux/DataReducer'
import { connect } from 'react-redux'
import { MainBoxPropsType, MapDispatchType, MapStateType, SearchBoxPropsType } from './MainBoxTypes'
import React from 'react'
import { useFormik } from 'formik'

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
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            props.updateSearchInputValue(values.searchInput)
            resetForm({ values: '' })
        },
    })
    return <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
            <form onChange={formik.handleSubmit} onSubmit={formik.handleSubmit}>
                <Input onChange={formik.handleChange} id="searchInput" name='searchInput' className={styles.input} placeholder="Search" bordered={false} onFocus={()=> {props.toggleSearch(true)}} onBlur={() => {props.toggleSearch(false)}} value={props.searchInputValue} />
            </form>  
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
    </div>
}

const MainBox = (props: MainBoxPropsType) => {
    return <div className={styles.mainBox}>
        <InfoBox />
        <SearchBox updateSearchInputValue={props.updateSearchInputValue} toggleSearch={props.toggleSearch} searchInputValue={props.searchInputValue}/>
    </div>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isSearchOn: state.data.isSearchOn,
        searchInputValue: state.data.searchInputValue
    }
}

const MainBoxContainer = connect<MapStateType, MapDispatchType, unknown, AppStateType>(mapStateToProps, {toggleSearch, updateSearchInputValue})(MainBox)

export default MainBoxContainer