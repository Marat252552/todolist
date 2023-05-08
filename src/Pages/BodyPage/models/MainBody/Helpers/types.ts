


export type Actions_T = {
    addGroup: (card: any, groupID: number, SetMessageError: (value: string) => void) => Promise<void>,
    deleteGroup: (card: any, groupID: number, SetMessageError: (value: string) => void) => Promise<void>,
    completeCard: (card: any, SetMessageError: (value: string) => void) => Promise<void>,
    incompleteCard: (card: any, SetMessageError: (value: string) => void) => Promise<void>,
    deleteCard: (id: number, SetMessageError: (value: string) => void, helper?: () => any) => Promise<void>,
    addCard: (content: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    changeCardText: (card: any, content: string, SetMessageError: (value: string) => void) => Promise<void>,
    createGroup: (groupID: number, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    deleteCardGroup: (groupID: number, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
    updateCardGroup: (groupID: number, name: string, icon: string, background: string, SetMessageError: (value: string) => void, helper?: any) => Promise<void>,
}