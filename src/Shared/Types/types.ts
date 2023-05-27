export type LoggedAPI_T = () => Promise<{status: number, data: {
    name: string,
    lastName: string,
    email: string,
    isActivated: boolean,
    imgSRC: string
}}>

export type Card_T = {
    _id: string,
    content: string,
    groupsIDs: Array<number>,
    is_completed: boolean
}