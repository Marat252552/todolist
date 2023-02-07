import { applyMiddleware, combineReducers, createStore } from "redux";
import DataReducer from "./DataReducer";
import  thunkMiddleware  from "redux-thunk";


const Reducers = combineReducers({
    data: DataReducer
})

const store = createStore(Reducers, applyMiddleware(thunkMiddleware))

export default store