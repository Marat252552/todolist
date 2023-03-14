import { makeAutoObservable } from "mobx"

class LocalStorage {
    AccessToken = ''
    Number = 0
    IsAuthorized = false
    userData = {
        name: '',
        lastName: '',
        email: ''
    }
    isActivated = false
    notedAboutActivated = false
    
    constructor() {
        makeAutoObservable(this)
    }
    setIsActivated(value: boolean) {
        this.isActivated = value
    }
    setNotedAboutActivated(value: boolean) {
        this.notedAboutActivated = value
    }
    setUserData(name: string, lastName: string, email: string) {
        this.userData.name = name
        this.userData.lastName = lastName
        this.userData.email = email
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