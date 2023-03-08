import { connect } from "react-redux"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import FirstGate from "../FirstGate"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import { Login_AC } from "./Redux/ActionCreators"
import { AppStateType } from "./Redux/Redux"
import { ControllerThunks } from "./Redux/Thunks"
import Register from "./Register/Register"
import { mapDispatch_T, mapState_T, PageProps_T } from "./types"

const Page = (props: PageProps_T) => {
    return <Routes>
            <Route path="/" element={<FirstGate isAuthorized={props.isAuthorized}/>}/>
            <Route path="/login" element={<AuthPage login_Thunk={props.login_Thunk} Login_AC={props.Login_AC} isAuthorized={props.isAuthorized}/>}/>
            <Route path="/home" element={<Body PullAllCardsThunk={props.pullAllCards_Thunk} Login_AC={props.Login_AC} isAuthorized={props.isAuthorized} />}/>
            <Route path="/register" element={<Register isAuthorized={props.isAuthorized} Login_AC={props.Login_AC}/>} />
        </Routes>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.data.isAuthorized
    }
}

const mapDispatchToProps = () => {
    return {
        Login_AC, 
        pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk, 
        login_Thunk: ControllerThunks.login_Thunk}
}

const PageContainer = connect<mapState_T, mapDispatch_T, unknown, AppStateType>(mapStateToProps, {
    Login_AC, 
    pullAllCards_Thunk: ControllerThunks.pullAllCards_Thunk, 
    login_Thunk: ControllerThunks.login_Thunk})(Page)

export default PageContainer