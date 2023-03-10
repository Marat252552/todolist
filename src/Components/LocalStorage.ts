import { makeAutoObservable } from "mobx"

class LocalStorage {
    AccessToken = ''
    constructor() {
        makeAutoObservable(this)
    }
    setToken(token: string) {
        this.AccessToken = token
    }
}

export default new LocalStorage()