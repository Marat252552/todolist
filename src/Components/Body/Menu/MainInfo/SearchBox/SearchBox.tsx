import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useFormik } from 'formik'
import styles from './../SearchBox/SearchBox.module.css'
import { SearchBoxPropsType } from './types'

const SearchBox = (props: SearchBoxPropsType) => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            props.updateSearchInputValue_AC(values.searchInput)
            resetForm({ values: '' })
        },
    })
    return <div className={styles.searchBox}>
            <form onChange={formik.handleSubmit} onSubmit={formik.handleSubmit}>
                <Input onChange={formik.handleChange} id="searchInput" name='searchInput' className={styles.input} placeholder="Search" bordered={false} onFocus={() => { props.toggleSearch_AC(true) }} onBlur={() => { props.toggleSearch_AC(false) }} value={props.searchInputValue} />
            </form>
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
}

export default SearchBox