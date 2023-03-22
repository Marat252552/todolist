import styles from './MainBox.module.css'
import { Modal } from 'antd'
import { LoadingOutlined, SyncOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { AppStateType } from '../../../../Side/Redux/Redux'
import { connect } from 'react-redux'
import { MainBoxPropsType, MapDispatchType, MapStateType } from './MainBoxTypes'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { AuthAPI, UsersAPI } from '../../../../Side/API/Api'
import { toggleSearch_AC, updateSearchInputValue_AC } from '../../../../Side/Redux/ActionCreators'
import { ControllerThunks } from '../../../../Side/Redux/Thunks'
import { observer } from "mobx-react-lite";
import LocalStorage from '../../../../Side/Mobx/LocalStorage'
import { useState } from 'react'
import SearchBox from './SearchBox/SearchBox'
import InfoBox from './InfoBox/InfoBox'
import { message } from 'antd';
import { PushData_Thunk } from '../../../../Side/Mobx/Thunks'

const MainBox = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const SetMessageError = (value: string) => {
        messageApi.open({
            type: 'error',
            content: value,
        });
    }
    // Stack для изменения аватарки
    let [isFileModalOpen, setIsFileModalOpen] = useState(false);
    let [fileLoading, setFileLoading] = useState(false)
    let [file, setFile] = useState(null);
    let file_F = {
        showModal() {
            setIsFileModalOpen(true);
        },
        closeModal() {
            setIsFileModalOpen(false);
        },
        async handleOk() {
            setFileLoading(true)
            try {
                const formData = new FormData()
                formData.append('img', file)
                let response = await AuthAPI.setPhoto(formData)
                LocalStorage.setUserImgSRC(response.data.imgSRC)
            } catch (e) {
                console.log(e)
            } finally {
                setFileLoading(false)
                setIsFileModalOpen(false)
            }
        },
        async handleCancel() {
            setIsFileModalOpen(false);
        }
    }
    // Stack для удаления пользователя
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    let [logoutLoading, setLogoutLoading] = useState(false)
    let [deleteUserLoading, setDeleteUserLoading] = useState(false)
    let deleteUser_F = {
        async showModal () {
            setIsDeleteModalOpen(true);
        },
        async handleOk () {
            setDeleteUserLoading(true)
            try {
                let response = await UsersAPI.DeleteUser()
                if (response.status === 200) {
                    LocalStorage.setToken('')
                    LocalStorage.setIsAuthorized(false)
                }
                setIsDeleteModalOpen(false);
            } catch (e) {
                SetMessageError('Кажется, произошла ошибка')
            } finally {
                setDeleteUserLoading(false)
            }
        },
        async handleDeleteCancel () {
            setIsDeleteModalOpen(false);
        }
    }
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
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div onClick={deleteUser_F.showModal}>Удалить аккаунт</div>
            ),
            danger: true,
            icon: <UserDeleteOutlined />
        },
        {
            key: '2',
            label: (
                <div onClick={async () => {
                    try {
                        await PushData_Thunk()
                    } catch (e: any) {
                        SetMessageError(e.message)
                    }
                }}>Синхронизировать</div>
            ),
            icon: <SyncOutlined />
        },
        {
            key: '3',
            label: (
                <div onClick={file_F.showModal}>Изменить аватарку</div>
            ),
            icon: (logoutLoading) ? <LoadingOutlined /> : <UserDeleteOutlined />
        },
        {
            key: '4',
            label: (
                <div onClick={Logout}>Выйти</div>
            ),
            danger: true,
            icon: (logoutLoading) ? <LoadingOutlined /> : <UserDeleteOutlined />
        },

    ];


    const [open, setOpen] = useState(false);
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '2' || e.key === '1' || e.key === '3') {
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
                    <InfoBox />
                </Space>
            </a>
        </Dropdown>
        <Modal title="Внимание!" open={isDeleteModalOpen} confirmLoading={deleteUserLoading} onOk={deleteUser_F.handleOk} onCancel={deleteUser_F.handleDeleteCancel} okType='danger' okText='Удалить' cancelText='Отменить'>
            <p>Вы точно хотите удалить аккаунт?</p>
            <p>Восстановить удаленный аккаунт невозможно</p>
        </Modal>
        <Modal title="Изменение аватарки" open={isFileModalOpen} confirmLoading={fileLoading} onOk={file_F.handleOk} onCancel={file_F.handleCancel} okType='primary' okText='Сохранить' cancelText='Отменить'>
            <p>Загрузите изображение</p>
            <input type='file' onChange={e => setFile(e.target.files[0])} />
        </Modal>
        <SearchBox />
    </div>
})

export default MainBox