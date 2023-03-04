import styles from './MainBox.module.css'
import { App, Avatar, Button, Modal, Popover } from 'antd'
import { Input } from 'antd'
import { DownOutlined, SearchOutlined, SettingOutlined, SmileOutlined, SyncOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { AppStateType } from '../../../Redux/Redux'
import { logoutThunk, toggleSearch, updateSearchInputValue } from '../../../Redux/DataReducer'
import { connect } from 'react-redux'
import { InfoBoxPropsType, MainBoxPropsType, MapDispatchType, MapStateType, SearchBoxPropsType } from './MainBoxTypes'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { GetUsersAPI } from '../../../../Api/Api'


const InfoBox = (props: InfoBoxPropsType) => {
    return <div className={styles.mainBoxInfo}>
        <Avatar className={styles.avatar} />
        <div className={styles.mainBoxInfoText}>
            <span>{props.name} {props.lastName}</span>
            <span>{props.email}</span>
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
                <Input onChange={formik.handleChange} id="searchInput" name='searchInput' className={styles.input} placeholder="Search" bordered={false} onFocus={() => { props.toggleSearch(true) }} onBlur={() => { props.toggleSearch(false) }} value={props.searchInputValue} />
            </form>
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
    </div>
}

const MainBox = (props: MainBoxPropsType) => {
    let showUsers = async () => {
        let res = await GetUsersAPI()
        console.log(res)
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div>Параметры</div>
            ),
            icon: <SettingOutlined />
        },
        {
            key: '2',
            label: (
                <div onClick={showUsers}>Получить юзеров</div>
            ),
            icon: <SyncOutlined />
        },
        {
            key: '3',
            label: (
                <div onClick={props.logoutThunk}>Выйти</div>
            ),
            danger: true,
            icon: <UserDeleteOutlined />
        },
        
    ];
    return <div className={styles.mainBox}>
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <InfoBox email={props.email} name={props.name} lastName={props.lastName} isAuthorized={props.isAuthorized} logoutThunk={props.logoutThunk}/>
                </Space>
            </a>
        </Dropdown>
        <SearchBox
            updateSearchInputValue={props.updateSearchInputValue}
            toggleSearch={props.toggleSearch}
            searchInputValue={props.searchInputValue} />
    </div>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isSearchOn: state.data.isSearchOn,
        searchInputValue: state.data.searchInputValue,
        isAuthorized: state.data.isAuthorized,
        name: state.data.name,
        lastName: state.data.lastName,
        email: state.data.email
    }
}

const MainBoxContainer = connect<MapStateType, MapDispatchType, unknown, AppStateType>(mapStateToProps, { toggleSearch, updateSearchInputValue, logoutThunk })(MainBox)

export default MainBoxContainer