import { makeAutoObservable } from "mobx"

class LocalStorage {
    AccessToken = ''
    Number = 0
    IsAuthorized = false
    userData = {
        name: '',
        lastName: '',
        email: '',
        imgSRC: ''
    }
    isActivated = false
    notedAboutActivated = true
    error = ''
    state = {
        loading: false,
        searchInputValue: '',
        isSearchOn: false,
    }
    constructor() {
        makeAutoObservable(this)
    }
    setError(text: string) {
        this.error = text
    }
    // Используется для сохранения карточки с сервера
    toggleLoading(value: boolean) {
        this.state.loading = value
        console.log(this.state.loading)
    }
    setIsActivated(value: boolean) {
        this.isActivated = value
    }
    setNotedAboutActivated(value: boolean) {
        this.notedAboutActivated = value
    }
    setUserData(name: string, lastName: string, email: string, imgSRC?: string) {
        this.userData.name = name
        this.userData.lastName = lastName
        this.userData.email = email
        if(!imgSRC) {
            this.userData.imgSRC = 'http://localhost:3000/default_user.jpg'
        }
        
    }
    setUserImgSRC(imgSRC: string) {
        this.userData.imgSRC = imgSRC
    }
    setToken(token: string) {
        this.AccessToken = token
    }
    setNumber(value: number) {
        this.Number = this.Number + value
    }
    setIsAuthorized(value: boolean) {
        this.IsAuthorized = value
    }
}

export default new LocalStorage()