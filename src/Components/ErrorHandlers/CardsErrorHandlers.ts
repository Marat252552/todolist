

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