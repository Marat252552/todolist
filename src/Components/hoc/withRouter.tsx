import { LoggedAPI } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';



export const withAuthRedirect = (Component: any) => {
    let HocFunction = async (props: any) => {
        const navigate = useNavigate()
        let response = await LoggedAPI()
        if(response.status !== 200) {
            navigate('/login')
        }
        return <Component {...props}/>
    }
    return HocFunction
}