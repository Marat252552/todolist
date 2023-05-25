import { observer } from "mobx-react-lite"
import { createContext, useContext, useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import AuthPage from "../../Pages/AuthPage"
import BodyPage from './../../Pages/BodyPage/index'
import LoadingScreen from "../../Shared/Widgets/LoadingScreen/LoadingScreen"
import LocalStorage from "../state/LocalStorage"
import Register from "../../Pages/SigninPage"
import { message } from "antd"
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
                <Route path="/login" element={<AuthPage setError={setError} />} />
                {
                    LocalStorage.IsAuthorized?
                    <Route path="/" element={<BodyPage setError={setError} />} />
                    :
                    undefined
                }
                <Route path="/register" element={<Register setError={setError} />} />
                <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    </div>
})

const PageAPIContainer = () => {
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let a = async () => {
            try {
                let {data: {name, email, lastName}, status} = await LoggedAPI()
                if (status === 200) {
                    LocalStorage.setUserData(name, lastName, email)
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