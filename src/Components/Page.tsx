import { useEffect } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { LoggedAPI, PullCardsAPI } from "../Api/Api"
import FirstGate from "../FirstGate"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import { Login, setToken } from "./Redux/DataReducer"
import { AppStateType } from "./Redux/Redux"
import { loginType } from "./Redux/ReduxTypes"
import Register from "./Register/Register"

const Page =  (props: {loginThunk: (login: string, password: string) => void, isAuthorized: boolean, Login: (login: string, email: string, name: string, lastName: string) => loginType}) => {
    return <Routes>
            <Route path="/" element={<FirstGate isAuthorized={props.isAuthorized}/>}/>
            <Route path="/login" element={<AuthPage Login={props.Login} isAuthorized={props.isAuthorized}/>}/>
            <Route path="/home" element={<Body Login={props.Login} isAuthorized={props.isAuthorized} />}/>
            <Route path="/register" element={<Register Login={props.Login}/>} />
        </Routes>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.data.isAuthorized
    }
}

const PageContainer = connect(mapStateToProps, {Login, setToken})(Page)

export default PageContainer