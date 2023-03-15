import {StarOutlined, DeploymentUnitOutlined, HomeOutlined, CalendarOutlined, UserOutlined} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import LocalStorage from '../../../Mobx/LocalStorage'
import { SwitchCardGroup_Thunk } from '../../../Mobx/Thunks'
import styles from './CardsInfo.module.css'
import { CardsInfoPropsType, MakeMenuCardGroupPropsType } from './CardsInfoType'

const iconConditions = (icon: string) => {
    switch (icon) {
        case 'StarOutlined': { return <StarOutlined style={{fontSize: '18px', color: 'rgb(210, 82, 82)'}}/> }
        case 'HomeOutlined': { return <HomeOutlined style={{fontSize: '18px', color: 'rgb(65, 90, 255)'}}/>}
        case 'DeploymentUnitOutlined': { return <DeploymentUnitOutlined style={{fontSize: '18px', color: 'rgb(149, 188, 206)'}} />}
        case 'CalendarOutlined': { return <CalendarOutlined style={{fontSize: '18px', color: 'rgb(24, 96, 0)'}} />}
        case 'UserOutlined': { return <UserOutlined style={{fontSize: '18px', color: 'rgb(24, 96, 0)'}} />}
    }
}

const MakeMenuCardGroup = (props: MakeMenuCardGroupPropsType) => {
    return <div>
        <button onClick={() => {
            SwitchCardGroup_Thunk(props.groupID)
            }} className={styles.button}>
            <div className={styles.buttonIcon}>{iconConditions(props.icon)}</div>
            <div className={styles.buttonText}>{props.name}</div>
        </button>
    </div>
}

const CardsInfo = observer((props: CardsInfoPropsType) => {
    return <div>
        {LocalStorage.state.menuCardGroups.map(group => {
            return <MakeMenuCardGroup key={group.groupID} name={group.name} groupID={group.groupID} icon={group.icon} />
        })}
        <div className={styles.line}></div>
    </div>
})

export default CardsInfo