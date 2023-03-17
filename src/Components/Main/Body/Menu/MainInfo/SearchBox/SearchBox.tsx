import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useFormik } from 'formik'
import LocalStorage from '../../../../../Side/Mobx/LocalStorage'
import styles from './../SearchBox/SearchBox.module.css'
import { SearchBoxPropsType } from './types'

const SearchBox = () => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            resetForm({ values: '' })
        },
    })
    return <div className={styles.searchBox}>
            <form onChange={formik.handleSubmit} onSubmit={formik.handleSubmit}>
                <Input onChange={formik.handleChange} id="searchInput" name='searchInput' className={styles.input} placeholder="Search" bordered={false} value={LocalStorage.state.searchInputValue} />
            </form>
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
}

export default SearchBox