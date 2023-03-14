import styles from './MainBox.module.css'
import { App, Avatar, Button, Popover, Modal } from 'antd'
import { Input } from 'antd'
import { DownOutlined, LoadingOutlined, SearchOutlined, SettingOutlined, SmileOutlined, SyncOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { AppStateType } from '../../../Redux/Redux'
import { connect } from 'react-redux'
import { MainBoxPropsType, MapDispatchType, MapStateType } from './MainBoxTypes'
import { useFormik } from 'formik';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { AuthAPI, UsersAPI } from '../../../../Api/Api'
import { toggleSearch_AC, updateSearchInputValue_AC } from '../../../Redux/ActionCreators'
import { ControllerThunks } from '../../../Redux/Thunks'
import { observer } from "mobx-react-lite";
import LocalStorage from '../../../LocalStorage'
import { useState } from 'react'
import SearchBox from './SearchBox/SearchBox'
import InfoBox from './InfoBox/InfoBox'
import { message } from 'antd';

const MainBox = (props: MainBoxPropsType) => {
    const [messageApi, contextHolder] = message.useMessage();
    const SetMessageError = (value: string) => {
        messageApi.open({
          type: 'error',
          content: value,
        });
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [logoutLoading, setLogoutLoading] = useState(false)
    let [deleteUserLoading, setDeleteUserLoading] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setDeleteUserLoading(true)
        try {
            let response = await UsersAPI.DeleteUser()
            if (response.status === 200) {
                LocalStorage.setToken('')
                LocalStorage.setIsAuthorized(false)
            }
            setIsModalOpen(false);
        } catch (e) {
            SetMessageError('Кажется, произошла ошибка')
        } finally {
            setDeleteUserLoading(false)
        }

    };
    const Logout = async () => {
        setLogoutLoading(true)
        try {
            let res = await AuthAPI.Logout()
            if (res.status === 200) {
                LocalStorage.setToken('')
                LocalStorage.setIsAuthorized(false)
            }
        } catch (e) {
            SetMessageError('Кажется, произошла ошибка')
        } finally {
            setLogoutLoading(false)
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={showModal}>Удалить аккаунт</div>
            ),
            danger: true,
            icon: <UserDeleteOutlined />
        },
        {
            key: '2',
            label: (
                <div onClick={() => {
                    props.PushData_Thunk(props.state)
                }}>Синхронизировать</div>
            ),
            icon: <SyncOutlined />
        },
        {
            key: '3',
            label: (
                <div onClick={Logout}>Выйти</div>
            ),
            danger: true,
            icon: (logoutLoading) ? <LoadingOutlined /> : <UserDeleteOutlined />
        },

    ];


    const [open, setOpen] = useState(false);
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '2' || e.key === '1') {
            setOpen(false);
        }
    };
    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };
    return <div className={styles.mainBox}>
        {contextHolder}
        <Dropdown menu={{ items, onClick: handleMenuClick, }} trigger={['click']} onOpenChange={handleOpenChange}
            open={open}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <InfoBox loading={props.loading} email={props.email} name={props.name} lastName={props.lastName} isAuthorized={props.isAuthorized} />
                </Space>
            </a>
        </Dropdown>
        <Modal title="Внимание!" open={isModalOpen} confirmLoading={deleteUserLoading} onOk={handleOk} onCancel={handleCancel} okType='danger' okText='Удалить' cancelText='Отменить'>
            <p>Вы точно хотите удалить аккаунт?</p>
            <p>Восстановить удаленный аккаунт невозможно</p>
        </Modal>
        <SearchBox
            updateSearchInputValue_AC={props.updateSearchInputValue_AC}
            toggleSearch_AC={props.toggleSearch_AC}
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
        email: state.data.email,
        state: state,
        loading: state.data.loading
    }
}

let mapDispatchToProps = () => {
    return {
        PushData_Thunk: ControllerThunks.PushData_Thunk,
        toggleSearch_AC, updateSearchInputValue_AC,
        pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk
    }
}

const MainBoxContainer = connect<MapStateType, MapDispatchType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps())(MainBox)

export default MainBoxContainer