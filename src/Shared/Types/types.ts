export type LoggedAPI_T = () => Promise<{status: number, data: {
    name: string,
    lastName: string,
    email: string,
    isActivated: boolean,
    imgSRC: string
}}>