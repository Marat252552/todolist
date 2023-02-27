import { useEffect } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { LoggedAPI } from "../Api/Api"
import FirstGate from "../FirstGate"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import { authThunk, Login, loginThunk } from "./Redux/DataReducer"
import { AppStateType } from "./Redux/Redux"

const Page =  (props: {loginThunk: (login: string, password: string) => void, isAuthorized: boolean, Login: any}) => {
    let navigate = useNavigate()
    useEffect(() => {
        let a = async () => { 
            try {
                let res = await LoggedAPI()
                console.log(res)
                if(+res.status === 200) {
                    console.log(res)
                    props.Login('fea', 'dwa')
                }
            } catch(e) {
                console.log(e)
            }
        }
        a()
    }, [])
    useEffect(() => {
        if(props.isAuthorized === true) {
            navigate('/home')
        } else {
            navigate('/login')
        }
    }, [props.isAuthorized])
    return <Routes>
            <Route path="/" element={<FirstGate isAuthorized={props.isAuthorized}/>}/>
            <Route path="/login" element={<AuthPage loginThunk={props.loginThunk} isAuthorized={props.isAuthorized}/>}/>
            <Route path="/home" element={<Body />}/>
        </Routes>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.data.isAuthorized
    }
}

const PageContainer = connect(mapStateToProps, {loginThunk, authThunk, Login})(Page)

export default PageContainer