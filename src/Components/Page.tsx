import { connect } from "react-redux"
import AuthPage from "./Auth/AuthPage"
import Body from "./Body/Body"
import { loginThunk } from "./Redux/DataReducer"
import { AppStateType } from "./Redux/Redux"

const Page = (props: {loginThunk: (login: string, password: string) => void, isAuthorized: boolean}) => {
    if(props.isAuthorized === true) {
        return <Body />
    } else {
        return <AuthPage loginThunk={props.loginThunk}/>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuthorized: state.data.isAuthorized
    }
}

const PageContainer = connect(mapStateToProps, {loginThunk})(Page)

export default PageContainer