import styles from './MainBox.module.css'
import { App, Avatar, Button, Popover, Modal } from 'antd'
import { Input } from 'antd'
import { DownOutlined, LoadingOutlined, SearchOutlined, SettingOutlined, SmileOutlined, SyncOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { AppStateType } from '../../../Redux/Redux'
import { connect } from 'react-redux'
import { InfoBoxPropsType, MainBoxPropsType, MapDispatchType, MapStateType, SearchBoxPropsType } from './MainBoxTypes'
import { useFormik } from 'formik';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { DeleteUserAPI, GetUsersAPI, LogoutAPI } from '../../../../Api/Api'
import { toggleSearch_AC, updateSearchInputValue_AC } from '../../../Redux/ActionCreators'
import { ControllerThunks } from '../../../Redux/Thunks'
import { observer } from "mobx-react-lite";
import LocalStorage from '../../../LocalStorage'
import { useState } from 'react'


const InfoBox = observer((props: InfoBoxPropsType) => {
    const makeLoading = () => {
        return <div style={{ width: '100%' }}>
            <div className={styles.loadingioSpinnerRollingAjhtd6xnhrc}><div className={styles.ldioAqq6nx8vg0n}>
                <div></div>
            </div></div>
        </div>
    }
    return <div className={styles.mainBoxInfo}>
        <Avatar className={styles.avatar} />
        <div className={styles.mainBoxInfoText}>
            <span>{LocalStorage.userData.name} {LocalStorage.userData.lastName}</span>
            <span>{LocalStorage.userData.email}</span>
        </div>
        <div className={styles.imgDiv}>
            {(props.loading) ? makeLoading() : undefined}
        </div>
    </div>
})

const SearchBox = (props: SearchBoxPropsType) => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            props.updateSearchInputValue_AC(values.searchInput)
            resetForm({ values: '' })
        },
    })
    return <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
            <form onChange={formik.handleSubmit} onSubmit={formik.handleSubmit}>
                <Input onChange={formik.handleChange} id="searchInput" name='searchInput' className={styles.input} placeholder="Search" bordered={false} onFocus={() => { props.toggleSearch_AC(true) }} onBlur={() => { props.toggleSearch_AC(false) }} value={props.searchInputValue} />
            </form>
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
    </div>
}

const MainBox = (props: MainBoxPropsType) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [logoutLoading, setLogoutLoading] = useState(false)
    let [syncLoading, setSyncLoading] = useState(false)
    let [deleteUserLoading, setDeleteUserLoading] = useState(false)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setDeleteUserLoading(true)
        try {
            let response = await DeleteUserAPI()
            if (response.status === 200) {
                LocalStorage.setToken('')
                LocalStorage.setIsAuthorized(false)
            }
            setIsModalOpen(false);
        } catch (e) {
            console.log(e)
        } finally {
            setDeleteUserLoading(false)
        }

    };
    const Logout = async () => {
        setLogoutLoading(true)
        try {
            let res = await LogoutAPI()
            if (res.status === 200) {
                LocalStorage.setToken('')
                LocalStorage.setIsAuthorized(false)
            }
        } catch (e) {
            console.log(e)
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
            icon: (syncLoading) ? <LoadingOutlined /> : <SyncOutlined />
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
        if (e.key === '1') {
            setOpen(false);
        }
    };
    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };
    return <div className={styles.mainBox}>
        <Dropdown menu={{ items, onClick: handleMenuClick, }} trigger={['click']} onOpenChange={handleOpenChange}
            open={open}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <InfoBox loading={props.loading} email={props.email} name={props.name} lastName={props.lastName} isAuthorized={props.isAuthorized} logout_Thunk={props.logout_Thunk} />
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
        logout_Thunk: ControllerThunks.logout_Thunk,
        pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk
    }
}

const MainBoxContainer = connect<MapStateType, MapDispatchType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps())(MainBox)

export default MainBoxContainer