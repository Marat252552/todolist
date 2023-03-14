import LocalStorage from '../LocalStorage'
import styles from './Modal.module.css'


export const ModalWindow = ({active, setActive, children}: any) => {
    return <div className={(active)? styles.active : styles.modal} onClick={() =>{
        setActive(false)
    }}>
        <div className={(active)? styles.modalContentActive : styles.modalContent} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
}

// export const ModalWindow = ({active, setActive, children}: any) => {
//     return <div className={(active)? styles.active : styles.modal} onClick={() =>setActive(false)}>
//         <div className={(active)? styles.modalContentActive : styles.modalContent} onClick={e => e.stopPropagation()}>
//             {children}
//         </div>
//     </div>
// }