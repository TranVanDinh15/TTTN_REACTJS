import cartReducer from "./cart"
import { combineReducers } from "redux"
import navBarActionReducer from "./isActionNavBar"
import loginReducers from "./reducerLogin"
const rootReducer = combineReducers({
    cartPr: cartReducer,
    displayNavbar: navBarActionReducer,
    rootLoginReducer: loginReducers
})
export default rootReducer