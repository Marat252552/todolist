import { Props_T } from "./lib/types"
import styles from './lib/styles.module.css'

const CompletedCardInfo = (props: Props_T) => {
    if (props.requiredGroupsArray === undefined) {
        return <div></div>
    }
    return <div className={styles.mainContainer}>
        <p style={{ textDecoration: 'Line-through' }}>{props.content}</p>
        <span className={styles.groupName}>
            {props.requiredGroupsArray[0] && props.requiredGroupsArray.map(group => {
                if (group.name !== 'Важно') {
                    return <span key={group.groupID}>{group.name} </span>
                }
            }
            )}
        </span>
    </div>
}

export default CompletedCardInfo