import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import AuthPage from "../../Pages/AuthPage"
import BodyPage from './../../Pages/BodyPage/index'
import LoadingScreen from "../../Shared/Widgets/LoadingScreen/LoadingScreen"
import LocalStorage from "../state/LocalStorage"
import Register from "../../Pages/SigninPage"
import { message } from "antd"
import ForgotMyPassword from "../../Pages/ForgotMyPassword"
import { LoggedAPI } from "../../Shared/Api/Api"

const Page = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const setError = (value: string) => {
        messageApi.open({
            type: 'error',
            content: value,
        });
    }
    const setSuccess = (value: string) => {
        messageApi.open({
            type: 'success',
            content: value,
        });
    }
    // Редирект в зависимости от того, авторизован пользователь или нет
    let navigate = useNavigate()
    useEffect(() => {
        if (LocalStorage.IsAuthorized === false) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [LocalStorage.IsAuthorized])
    return <div>
        {contextHolder}
        <Routes>
            <Route path="/login" element={<AuthPage setError={setError}/>} />
            <Route path="/" element={<BodyPage setError={setError}/>} />
            <Route path="/register" element={<Register setError={setError}/>} />
            <Route path="/forgotmypassword" element={<ForgotMyPassword setError={setError} setSuccess={setSuccess}/> } />
        </Routes>
    </div>
    
})

const PageAPIContainer = () => {
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let a = async () => {
            try {
                let response = await LoggedAPI()
                if (response.status === 200) {
                    LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                    LocalStorage.setIsAuthorized(true)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        a()
    }, [])
    if (loading) {
        return <LoadingScreen />
    } else {
        return <Page />
    }
}

export default PageAPIContainer