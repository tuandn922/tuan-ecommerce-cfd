import { combineReducers } from 'redux'
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer'
import userReducer from './userReducer'

export default combineReducers({
    categories: categoryReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer
})