const initialState = {
    isAction: false
}
const navBarActionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_ISACTION':
            const action = { ...state }
            if (action.isAction == true) {
                action.isAction = false
            } else {
                action.isAction = true
            }
            return action

        default:
            return state;
    }
}
export default navBarActionReducer