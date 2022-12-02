export const addNewProduct = (cartPayLoad) => {
    return {
        type: 'ADD_NEW_PRODUCT',
        payload: cartPayLoad
    }
}
export const removeProduct = (cartPayload) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: cartPayload
    }
}
export const deleteProduct = (cartPayLoad) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: cartPayLoad
    }
}
export const removeAllProduct = (cartPayLoad) => {
    return {
        type: 'REMOVE_ALL_PRODUCT',
        payload: cartPayLoad
    }
}
