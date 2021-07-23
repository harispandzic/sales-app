import { combineReducers, createStore } from "redux";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export const rootReducer = combineReducers({
    reducer
})

const store = createStore(
    rootReducer,
    composeEnhancers()
)

export default store;