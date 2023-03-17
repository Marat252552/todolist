import { StarOutlined, DeploymentUnitOutlined, HomeOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover } from 'antd'
import { observer } from 'mobx-react-lite'
import LocalStorage from '../../../Mobx/LocalStorage'
import { SwitchCardGroup_Thunk } from '../../../Mobx/Thunks'
import { ModalWindow } from '../../../Modal/Modal'
import Actions from '../../MainBody/Helpers/Actions'
import styles from './CardsInfo.module.css'
import { CardsInfoPropsType, MakeMenuCardGroupPropsType } from './CardsInfoType'
import { useState, useRef } from 'react'
import { Field, FormikProvider, useFormik } from 'formik'



const iconConditions = (icon: string) => {
    switch (icon) {
        case 'StarOutlined': { return <StarOutlined style={{ fontSize: '18px', color: 'rgb(210, 82, 82)' }} /> }
        case 'HomeOutlined': { return <HomeOutlined style={{ fontSize: '18px', color: 'rgb(65, 90, 255)' }} /> }
        case 'DeploymentUnitOutlined': { return <DeploymentUnitOutlined style={{ fontSize: '18px', color: 'rgb(149, 188, 206)' }} /> }
        case 'CalendarOutlined': { return <CalendarOutlined style={{ fontSize: '18px', color: 'rgb(24, 96, 0)' }} /> }
        case 'UserOutlined': { return <UserOutlined style={{ fontSize: '18px', color: 'rgb(24, 96, 0)' }} /> }
    }
}

const MakeMenuCardGroup = (props: MakeMenuCardGroupPropsType) => {
    // Состояние формы изменения имени группы
    let [updating, setUpdating] = useState(false)
    // Состояние popover
    let [open, setOpen] = useState(false)
    let handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    let Errors = (value: string) => {
        if (!value) {
            return 'Поле не может быть пустым'
        }
        if (value.length > 20) {
            return 'Название не больше 20 символов'
        }
    }
    const formik = useFormik({
        initialValues: {
            cardGroup: props.name,
        },
        onSubmit: async (values: any, { resetForm }: any) => {
            Actions.updateCardGroup(props.groupID, values.cardGroup, props.icon, props.background, props.SetMessageError)
            setUpdating(false)
        },
    })
    return <div>
        <Popover placement="bottomLeft"
            style={{ padding: '0' }}
            content={
                <div>
                    <Button onClick={() => {
                        Actions.deleteCardGroup(props.groupID, props.name, props.icon, props.background, props.SetMessageError)
                    }}>Delete</Button>
                    <Button onClick={() => { 
                        setUpdating(true)
                        setOpen(false)
                        }}>Переименовать колоду</Button>
                </div>
            }
            open={open}
            trigger="contextMenu"
            onOpenChange={handleOpenChange}
        >
            {(updating) ?
                // Форма изменения названия группы
                <button onClick={() => {
                    SwitchCardGroup_Thunk(props.groupID)
                }} className={styles.button}>
                    <div className={styles.buttonIcon}>{iconConditions(props.icon)}</div>
                    <div className={styles.buttonText}>
                        <div>
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Field
                                        autoFocus
                                        className={styles.input}
                                        placeholder='Название группы'
                                        id="cardGroup"
                                        name='cardGroup'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.cardGroup}
                                        validate={Errors}
                                        onBlur={() => {setUpdating(false)}}
                                        maxLength='20'
                                    />
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                </button>
                :
                <button
                    // Открывает popover
                    onContextMenu={() => {setOpen(true)}}
                    // Переключает на текущую группу
                    onClick={() => {
                    SwitchCardGroup_Thunk(props.groupID)
                }} className={styles.button}>
                    <div className={styles.buttonIcon}>{iconConditions(props.icon)}</div>
                    <div className={styles.buttonText}>{props.name}</div>
                </button>}
        </Popover>
    </div>
}

const CardsInfo = observer((props: { SetMessageError: (value: any) => void }) => {
    const [open, setOpen] = useState(false);
    const DrawerF = {
        showDrawer: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        }
    }
    return <div>
        <Drawer title="Basic Drawer" placement="right" onClose={DrawerF.close} open={open}>
            <p>Создание группы</p>
        </Drawer>
        {LocalStorage.state.menuCardGroups.map(group => {
            return <MakeMenuCardGroup SetMessageError={props.SetMessageError} background={group.background} key={group.groupID} name={group.name} groupID={group.groupID} icon={group.icon} />
        })}
        <div className={styles.line}></div>
        {LocalStorage.state.allCardGroups.map(group => {
            if (group.groupID !== 1 && group.groupID !== 2 && group.groupID !== 3 && group.groupID !== 4 && group.groupID !== 5)
                return <MakeMenuCardGroup SetMessageError={props.SetMessageError} background={group.background} key={group.groupID} name={group.name} groupID={group.groupID} icon={group.icon} />
        })}
        <Button onClick={() => {
            // setOpen(true)
            let groupID = Math.random()
            Actions.createGroup(groupID, 'Новая группа', 'StarOutlined', 'blue', props.SetMessageError)
        }}>Создать группу</Button>
    </div>
})

export default CardsInfo