

export const LoginErrorHandler = (e: any, setFormError: any, setMessageError: any) => {
    try {
        // Неверная капча
        if(e.response.status === 400) {
            setMessageError(e.response.data.message)
        }
        // Пользователь не найден или неверный пароль
        if(e.response.status === 404) {
            setFormError(e.response.data.message)
        }
    } catch(e) {
        setMessageError('Кажется, произошла ошибка')
    }       
}   
export const SigninErrorHandler = (e: any, setMessageError: any) => {
    try {
        // Неверная капча или не все поля заполнены
        if(e.response.status === 400) {
            setMessageError(e.response.data.message)
        }
    } catch(e) {
        setMessageError('Кажется, произошла ошибка')
    }       
}
export const LogoutErrorHandler = (e: any, setMessageError: any) => {
    try {
        // Неверная капча или не все поля заполнены
        if(e.response.status === 400) {
            setMessageError(e.response.data.message)
        }
    } catch(e) {
        setMessageError('Кажется, произошла ошибка')
    }       
}