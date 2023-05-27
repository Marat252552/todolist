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
    groupsIDs: Array<string>,
    is_completed: boolean
}

export type Group_T = {
    _id: string,
    background: string,
    icon: string,
    name: string,
}