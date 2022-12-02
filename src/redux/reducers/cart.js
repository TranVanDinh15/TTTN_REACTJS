

const initialState = {
    cart: []
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_PRODUCT': {
            const productInCart = state.cart.find(function (data) {
                return data.foodId === action.payload.foodId
            })

            if (!productInCart) {
                const newCart = [...state.cart, action.payload]
                return {
                    cart: newCart
                }
            } else {
                const newCart = state.cart
                const index = newCart.findIndex((data) => {
                    return data.foodId === action.payload.foodId
                })
                if (newCart[index].quantity === undefined) {
                    newCart[index].quantity = 1
                } else {
                    newCart[index].quantity = newCart[index].quantity + 1
                    newCart[index].totalPrice = newCart[index].totalPrice + newCart[index].price
                }
                return {
                    cart: [...newCart]
                }
            }
        }
        case 'DELETE_PRODUCT': {
            const newCart = state.cart
            const index = newCart.findIndex((data) => {
                return data.foodId === action.payload.foodId
            })
            newCart.splice(index, 1)
            return {
                cart: [...newCart]
            }
        }
        case 'REMOVE_PRODUCT': {
            const newCart = state.cart
            const index = newCart.findIndex((data) => {
                return data.foodId === action.payload.foodId
            })
            // if (index) {
            newCart[index].quantity = newCart[index].quantity - 1
            newCart[index].totalPrice = newCart[index].totalPrice - newCart[index].price
            // }
            return {
                cart: [...newCart]
            }
        }
        case 'REMOVE_ALL_PRODUCT': {
            return {
                cart: []
            }
        }
        default:
            return state
    }
}
export default cartReducer