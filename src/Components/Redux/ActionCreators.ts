import { UPDATE_CURRENT_CARDS, ADD_NEW_CARD, CLEAR_ALL_CARDS, CHANGE_TEXT_CARD, DELETE_CARD, SWITCH_COMPLETE_CARD, CHANGE_CURRENT_GROUP_ID, TOGGLE_SEARCH, ADD_GROUP_ID, DELETE_GROUP_ID, LOGOUT, LOGIN, UPDATE_SEARCH_INPUT_VALUE, CLEAR_CONTROLLERS, PULL_CARDS, CHANGE_CARD, TOGGLE_LOADING } from "./DataReducer"
import { AC_T } from "./ReduxTypes"


// Action creators that work with controller Thunks
export const addNewCard_AC: AC_T["addNewCardAC_T"] = (id, text, groupsIDs, isCompleted) => {
    return {
        type: ADD_NEW_CARD,
        id: id,
        text: text,
        groupsIDs: groupsIDs,
        isCompleted: isCompleted,
    }
}
export const deleteCard_AC: AC_T["deleteCardAC_T"] = (cardID) => {
    return {
        type: DELETE_CARD,
        cardID: cardID
    }
}
export const changeCard_AC: AC_T["changeCardAC_T"] = (id, text, groupsIDs, isCompleted) => {
    return {
        type: CHANGE_CARD,
        id: id,
        text: text,
        groupsIDs: groupsIDs,
        isCompleted: isCompleted,
    }
}
export const clearControllers: AC_T["clearControllersAC_T"] = (controller: number) => {
    return {
        type: CLEAR_CONTROLLERS,
        controller: controller
    }
}


// Action creators that save data about authorization of user on client side
export const Login_AC: AC_T["loginAC_T"] = (email, name, lastName) => {
    return {
        type: LOGIN,
        email: email,
        name: name,
        lastName: lastName
    }
}
export const Logout_AC: AC_T["logoutAC_T"] = ()  => {
    return {
        type: LOGOUT
    }
}

// Other action creators
export const updateCurrentCards_AC: AC_T["updateCurrentCardsAC_T"] = ()  => {
    return {
        type: UPDATE_CURRENT_CARDS
    }
}
export const pullCards_AC: AC_T["pullCardsAC_T"] = (id, text, groupsIDs, isCompleted) => {
    return {
        type: PULL_CARDS,
        id: id,
        text: text,
        groupsIDs: groupsIDs,
        isCompleted: isCompleted,
    }
}
export const clearAllCards_AC: AC_T["clearAllCardsAC_T"] = () => {
    return {
        type: CLEAR_ALL_CARDS
    }
}
export const changeTextCard_AC: AC_T["changeTextCardAC_T"] = (text, cardID) => {
    return {
        type: CHANGE_TEXT_CARD,
        text: text,
        cardID: cardID
    }
}
export const switchCompleteCard_AC: AC_T["switchCompleteCardAC_T"] = (cardID) => {
    return {
        type: SWITCH_COMPLETE_CARD,
        cardID: cardID
    }
}
export const changeCurrentCardGroupID_AC: AC_T["changeCurrentCardGroupIDAC_T"] = (groupID) => {
    return {
        type: CHANGE_CURRENT_GROUP_ID,
        groupID: groupID
    }
}
export const toggleSearch_AC: AC_T["toggleSearchAC_T"] = (isSearchOn) => {
    return {
        type: TOGGLE_SEARCH,
        isSearchOn: isSearchOn
    }
}
export const addGroupID_AC: AC_T["addGroupIDAC_T"] = (groupID, cardID) => {
    return {
        type: ADD_GROUP_ID,
        groupID: groupID,
        cardID: cardID
    }
}
export const deleteGroupID_AC: AC_T["deleteCardGroupIDAC_T"] = (groupID, cardID) => {
    return {
        type: DELETE_GROUP_ID,
        groupID: groupID,
        cardID: cardID
    }
}
export const updateSearchInputValue_AC: AC_T["updateSearchInputValueTypeAC_T"] = (text) => {
    return {
        type: UPDATE_SEARCH_INPUT_VALUE,
        text: text
    }
}
export const toggleLoading_AC: AC_T["toggleLoadingAC_T"] = (value) => {
    return {
        type: TOGGLE_LOADING,
        value: value
    }
}

