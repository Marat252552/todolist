import LocalStorage from "../../../../App/state/LocalStorage";
import { ModalWindow } from "../../../../Shared/Widgets/Modal/Modal"; 
import { message, Result, Button } from 'antd';

let MakeEmailWarning = () => {
    let setActive = () => {
        LocalStorage.setNotedAboutActivated(true)
    }
    return <>
        <ModalWindow active={!LocalStorage.notedAboutActivated} setActive={setActive}>
            <Result
                status="warning"
                title="Почта не подтверждена"
                subTitle="Чтобы получить доступ ко всем функциям приложения,
                 необходимо подтвердить указанную Вами почту"
                extra={
                    <Button type="primary" onClick={setActive}>
                        Хорошо
                    </Button>
                }
            />
        </ModalWindow>
    </>
}

export default MakeEmailWarning