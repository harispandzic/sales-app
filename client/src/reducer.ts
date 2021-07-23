import { UPDATE_NAME, UPDATE_LOGGED_USER, UPDATE_PRODUCTS, PURCHASE_ITEMS } from "./actions";

const INITIAL_STATE = {
    fullName: "",
    loggedUser: "",
    loggedUserID: 0,
    photo: "",
    products: [],
}

function reducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case UPDATE_NAME:
            return {
                fullName: action.payload
            };
        case UPDATE_LOGGED_USER:
            return {
                loggedUser: action.payload,
                loggedUserID: action.payload,
                photo:action.payload
            };
        case UPDATE_PRODUCTS:
            if (state.products && state.products.length !== 0) {
                return {
                    ...state,
                    products: [...state.products, action.payload],
                };
            }
            else {
                return {
                    ...state,
                    products: [action.payload],
                };
            }
        case PURCHASE_ITEMS:
            return {
                ...state,
                products: []
            };
        default:
            return state;
    }
}

export default reducer;