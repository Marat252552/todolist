import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const FirstGate = (props: any) => {
    let navigate = useNavigate()
    useEffect(() => {
        if(props.isAuthorized === false) {
            navigate('/login')
        }
    }, [props.isAuthorized])
    return <div>Redirecting...</div>
}

export default FirstGate