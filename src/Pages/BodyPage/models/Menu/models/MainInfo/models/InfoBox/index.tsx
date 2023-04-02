import { observer } from "mobx-react-lite"
import styles from './lib/styles.module.css'
import { Avatar } from "antd"
import LocalStorage from "../../../../../../../../App/state/LocalStorage"

const InfoBox = observer(() => {
    const makeLoading = () => {
        return <div style={{ width: '100%' }}>
            <div className={styles.loadingioSpinnerRollingAjhtd6xnhrc}><div className={styles.ldioAqq6nx8vg0n}>
                <div></div>
            </div></div>
        </div>
    }
    return <div className={styles.mainBoxInfo}>
        <Avatar className={styles.avatar} src={LocalStorage.userData.imgSRC}/>
        <div className={styles.mainBoxInfoText}>
            <span>{LocalStorage.userData.name} {LocalStorage.userData.lastName}</span>
            <span>{LocalStorage.userData.email}</span>
        </div>
        <div className={styles.imgDiv}>
            {(LocalStorage.state.loading) ? makeLoading() : undefined}
        </div>
    </div>
})

export default InfoBox