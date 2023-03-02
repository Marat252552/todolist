import { useEffect } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { LoggedAPI, PullCardsAPI } from "../Api/Api"
import FirstGate from "../FirstGate"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import { Login } from "./Redux/DataReducer"
import { AppStateType } from "./Redux/Redux"
import Register from "./Register/Register"

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
        let b = async () => {
            try {
                let a = await PullCardsAPI('25')
            } catch(e) {
                console.log(e)
            }
        }
        a()
        b()
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
            <Route path="/login" element={<AuthPage Login={props.Login} isAuthorized={props.isAuthorized}/>}/>
            <Route path="/home" element={<Body />}/>
            <Route path="/register" element={<Register Login={props.Login}/>} />
        </Routes>
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.data.isAuthorized
    }
}

const PageContainer = connect(mapStateToProps, {Login})(Page)

export default PageContainer