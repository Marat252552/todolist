import styles from './MainBox.module.css'
import { Avatar } from 'antd'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const InfoBox = () => {
    return <div className={styles.mainBoxInfo}>
        <Avatar className={styles.avatar} />
        <div className={styles.mainBoxInfoText}>
            <span>Name</span>
            <span>Name</span>
        </div>

    </div>
}

const SearchBox = () => {
    return <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
            <Input className={styles.input} placeholder="Search" bordered={false} />
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
    </div>
}

const MainBox = () => {
    return <div className={styles.mainBox}>
        <InfoBox />
        <SearchBox />
    </div>
}

export default MainBox