import { PlusOutlined } from '@ant-design/icons'
import styles from './lib/styles.module.css'
import FormikForm from './models/FormikForm'

const NewCardForm = () => {
    return <div className={styles.mainContainer}>
        <div className={styles.iconContainer}>
            <PlusOutlined />
        </div>
        <div className={styles.formContainer}>
            <FormikForm />
        </div>
    </div>
}

export default NewCardForm