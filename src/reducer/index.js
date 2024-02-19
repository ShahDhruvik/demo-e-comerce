import { combineReducers } from 'redux'
import cart from './cartReducer'
import products from './productReducer'
import orders from './orderReducer'

export default combineReducers({
    cart,products,orders
})