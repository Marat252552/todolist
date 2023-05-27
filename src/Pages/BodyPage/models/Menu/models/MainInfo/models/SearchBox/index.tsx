import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useFormik } from 'formik'
import styles from './lib/styles.module.css'

const SearchBox = (props: {setSearchInput: any}) => {
    const formik = useFormik({
        initialValues: {
            card: '',
        },
        onSubmit: (values: any, { resetForm }: any) => {
            console.log('ewgweghrwe')
            resetForm({ values: '' })
            props.setSearchInput(values.searchInput)
        },
    })
    return <div className={styles.searchBox}>
            <form onChange={formik.handleSubmit} onSubmit={formik.handleSubmit}>
                <Input onChange={formik.handleChange} id="searchInput" name='searchInput' className={styles.input} placeholder="Search" bordered={false} />
            </form>
            <button className={styles.searchButton}><SearchOutlined className={styles.searchIcon} /></button>
        </div>
}

export default SearchBox