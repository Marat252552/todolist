import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import { AuthAPI } from "../Api/Api"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import LoadingScreen from "./LoadingScreen/LoadingScreen"
import LocalStorage from "./LocalStorage"
import { ModalWindow } from "./Modal/Modal"
import { Login_AC } from "./Redux/ActionCreators"
import { AppStateType } from "./Redux/Redux"
import { ControllerThunks } from "./Redux/Thunks"
import Register from "./Register/Register"
import { mapDispatch_T, mapState_T, PageProps_T } from "./types"

const Page = observer((props: PageProps_T) => {
    let navigate = useNavigate()
    // Редирект в зависимости от того, авторизован пользователь или нет
    useEffect(() => {
        if (LocalStorage.IsAuthorized === false) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [LocalStorage.IsAuthorized])
    return <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<Body PullAllCardsThunk={props.pullAllCards_Thunk} />} />
        <Route path="/register" element={<Register />} />
    </Routes>
})

const mapStateToProps = (state: AppStateType) => {
    return {
    }
}

const mapDispatchToProps = () => {
    return {
        Login_AC,
        pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk
    }
}

const PageContainer = connect<mapState_T, mapDispatch_T, unknown, AppStateType>(mapStateToProps, {
    pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk
})(Page)



const PageAPIContainer = () => {
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let a = async () => {
            try {
                let response = await AuthAPI.Logged()
                if (response.status === 200) {
                    LocalStorage.setUserData(response.data.name, response.data.lastName, response.data.email)
                    LocalStorage.setToken(response.data.AccessToken)
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
        return <PageContainer />
    }
}

export default PageAPIContainer