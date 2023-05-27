import { useFormik } from 'formik'
import { Card_T } from '../../Shared/Types/types'
import styles from './lib/styles.module.css'
import Actions from '../../Pages/BodyPage/models/MainBody/Helpers/Actions'


const DrawerChangeCardForm = (props: {card: Card_T}) => {
    const formik = useFormik({
        initialValues: {
            card: props.card.content
        },
        onSubmit: (values: any) => {
            let content = values.card
            Actions.changeCardText(props.card, content)
        }
    })
    return <form onSubmit={formik.handleSubmit}>
        <input
            value={formik.values.card}
            id='card'
            type='text'
            name='card'
            onChange={formik.handleChange}
            className={styles.input}
        />
    </form>
}

export default DrawerChangeCardForm