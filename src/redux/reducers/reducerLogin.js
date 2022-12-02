import { createUserPost } from "../../component/axios/meThodPost";
const initialState = {
    user: null,
    isPending: false,
    err: false
}
const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN__USER__SUCCESS': {
            return {
                user: action.payload,
                isPending: false
            }
        }
        case 'AWAIT_PENDING_LOGIN': {
            return {
                user: action.payload,
                isPending: true
            }
        }
        case 'LOGOUT_USER_SUCCESS': {
            return {
                user: action.payload,
                isPending: false
            }
        }
        case 'LOGOUT_USER_ERROR': {
            return {
                isPending: false,
                err: true
            }
        }
        default:
            return state;
    }
}
export default loginReducers