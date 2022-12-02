export const successLogin = (payloadUser) => {
    return {
        type: 'LOGIN__USER__SUCCESS',
        payload: payloadUser
    }
}
export const actionPending = (payloadUser) => {
    return {
        type: 'AWAIT_PENDING_LOGIN',
        payload: payloadUser
    }
}
export const successLogout = (payloadUser) => {
    return {
        type: 'LOGOUT_USER_SUCCESS',
        payload: payloadUser
    }
}
export const successErr = (payloadUser) => {
    return {
        type: 'LOGOUT_USER_ERROR',
        payload: payloadUser
    }
}
