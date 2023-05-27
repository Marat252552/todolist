import styles from './lib/styles.module.css'

const CardInfo = (props: {
    content: string, requiredGroupsArray: Array<{
        groupID: number;
        name: string;
        icon: string;
        background: string
    }>,
}) => {
    if (props.requiredGroupsArray === undefined) {
        return <div></div>
    }
    return <div className={styles.mainContainer}>
        <p>{props.content}</p>
        <span className={styles.groupName}>{props.requiredGroupsArray.map(group => {
            if (group.name !== 'Важно') {
                return <span key={group.groupID}>{group.name} </span>
            }
        }
        )}</span>
    </div>
}

export default CardInfo