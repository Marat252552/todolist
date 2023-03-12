import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { LoggedAPI } from "../Api/Api"
import FirstGate from "../FirstGate"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import LoadingScreen from "./LoadingScreen/LoadingScreen"
import LocalStorage from "./LocalStorage"
import { Login_AC } from "./Redux/ActionCreators"
import { AppStateType } from "./Redux/Redux"
import { ControllerThunks } from "./Redux/Thunks"
import Register from "./Register/Register"
import { mapDispatch_T, mapState_T, PageProps_T } from "./types"

const Page = observer((props: PageProps_T) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (LocalStorage.IsAuthorized === false) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [LocalStorage.IsAuthorized])
    return <Routes>
        {/* <Route path="/" element={<FirstGate isAuthorized={props.isAuthorized}/>}/> */}
        <Route path="/login" element={<AuthPage login_Thunk={props.login_Thunk} Login_AC={props.Login_AC} isAuthorized={props.isAuthorized} />} />
        <Route path="/" element={<Body PullAllCardsThunk={props.pullAllCards_Thunk} Login_AC={props.Login_AC} isAuthorized={props.isAuthorized} />} />
        <Route path="/register" element={<Register isAuthorized={props.isAuthorized} Login_AC={props.Login_AC} />} />
    </Routes>
})

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.data.isAuthorized
    }
}

const mapDispatchToProps = () => {
    return {
        Login_AC,
        pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk,
        login_Thunk: ControllerThunks.login_Thunk
    }
}

const PageContainer = connect<mapState_T, mapDispatch_T, unknown, AppStateType>(mapStateToProps, {
    Login_AC,
    pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk,
    login_Thunk: ControllerThunks.login_Thunk
})(Page)



const PageAPIContainer = () => {
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        let a = async () => {
            try {
                let response = await LoggedAPI()
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