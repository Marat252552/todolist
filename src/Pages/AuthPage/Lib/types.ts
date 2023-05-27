type Result_T = {
    status: number,
    data: {
        name: string,
        lastName: string,
        email: string,
        imgSRC: string,
        isActivated: boolean,
        AccessToken: string
    }
}

export type LoginAPI_T = (login: string, password: string, remember: boolean, captchaToken: string) => Promise<Result_T>