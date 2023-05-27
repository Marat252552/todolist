import { Group_T } from '../../Shared/Types/types'
import styles from './lib/styles.module.css'

const CardInfo = (props: {
    content: string, requiredGroupsArray: Array<Group_T>,
}) => {
    if (props.requiredGroupsArray === undefined) {
        return <div></div>
    }
    return <div className={styles.mainContainer}>
        <p>{props.content}</p>
        <span className={styles.groupName}>{props.requiredGroupsArray[0] && props.requiredGroupsArray.map(group => {
            if(group) {
                if (group.name !== 'Важно') {
                    return <span key={group._id}>{group.name} </span>
                }
            }
        }
        )}</span>
    </div>
}

export default CardInfo