import {StarOutlined, DeploymentUnitOutlined, HomeOutlined, CalendarOutlined, UserOutlined} from '@ant-design/icons'
import styles from './CardsInfo.module.css'

const iconConditions = (icon: any) => {
    switch (icon) {
        case 'StarOutlined': { return <StarOutlined style={{fontSize: '18px', color: 'rgb(210, 82, 82)'}}/> }
        case 'HomeOutlined': { return <HomeOutlined style={{fontSize: '18px', color: 'rgb(65, 90, 255)'}}/>}
        case 'DeploymentUnitOutlined': { return <DeploymentUnitOutlined style={{fontSize: '18px', color: 'rgb(149, 188, 206)'}} />}
        case 'CalendarOutlined': { return <CalendarOutlined style={{fontSize: '18px', color: 'rgb(24, 96, 0)'}} />}
        case 'UserOutlined': { return <UserOutlined style={{fontSize: '18px', color: 'rgb(24, 96, 0)'}} />}
    }
}

const MakeMenuCardGroup = (props: any) => {
    return <div>
        <button onClick={() => {props.changeCurrentCardGroupID(props.groupID)}} className={styles.button}>
            <div className={styles.buttonIcon}>{iconConditions(props.icon)}</div>
            <div className={styles.buttonText}>{props.name}</div>
        </button>
    </div>
}

const CardsInfo = (props: any) => {
    return <div>
        {props.data.menuCardGroups.map(group => {
            return <MakeMenuCardGroup key={group.groupID} name={group.name} groupID={group.groupID} icon={group.icon} changeCurrentCardGroupID={props.changeCurrentCardGroupID}/>
        })}
        <div className={styles.line}></div>
    </div>
}

export default CardsInfo