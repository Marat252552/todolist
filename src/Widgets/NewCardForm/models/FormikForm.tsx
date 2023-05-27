import { Field, FormikProvider, useFormik } from "formik"
import Actions from "../../../Pages/BodyPage/models/MainBody/Helpers/Actions"
import styles from './../lib/styles.module.css'

let emptyField = (value: string) => {
    if (!value) {
        return 'Поле не может быть пустым'
    }
}

const FormikForm = () => {
    const formik = useFormik({
        initialValues: {
            cardValue: '',
        },
        onSubmit: async (values: {cardValue: string}, {resetForm}) => {
            let content = values.cardValue
            Actions.addCard(content)
            resetForm()
        },
    })
    return <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
            <Field
                className={styles.input}
                placeholder='Добавить карточку'
                id="cardValue"
                name='cardValue'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.cardValue}
                validate={emptyField}
            />
        </form>
    </FormikProvider>
}

export default FormikForm