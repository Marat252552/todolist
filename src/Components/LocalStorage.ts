import { makeAutoObservable } from "mobx"

class LocalStorage {
    AccessToken = ''
    Number = 0
    IsAuthorized = false
    constructor() {
        makeAutoObservable(this)
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