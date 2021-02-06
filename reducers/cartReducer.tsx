import { CART_ADD_ITEM, CART_CLOSE, CART_ITEM_DECREMENT, CART_ITEM_INCREMENT, CART_OPEN, CART_PAYMENT_OPTION, CART_REMOVE_ITEM, CART_SHIPPING_OPTION } from "../actions/type";
import LocalStorage from "../helper/LocalStorage";

const initState = {
    list: [],
    amount: 0,
    total: 0,
    shippingFee: 15000,
    shippingSelected: 'giao_thuong',
    vat: 0,
    paymentMethod: 'creditCard',
    ...(LocalStorage.get('cart') || {}),
    open: false,
}
interface stateInit {
    open: Boolean,
    list: any[],
    total: number
}


export default (state: stateInit = initState, action: any) => {
    function returnState(state: any) {
        LocalStorage.set('cart', state)
        return { ...state }
    }

    switch (action.type) {
        case CART_OPEN:

            return {
                ...state,
                open: true
            }
        case CART_CLOSE:
            return {
                ...state,
                open: false
            }
        case CART_ADD_ITEM:
            {
                let { list, total } = state;
                let f: any = list.find((e: any) => e._id === action.payload._id)
                if (f) {
                    f.cart_count++;
                } else {
                    action.payload.cart_count = 1;
                    list.push(action.payload)
                }
                total++;


                return returnState({
                    ...state,
                    amount: list.reduce((total: number, current: any) => total + current.cart_count * current.real_price, 0),
                    list,
                    total
                })
            }
        case CART_ITEM_DECREMENT:
            {
                let { list, total } = state;

                let f = list.findIndex(e => e._id === action.payload)
                console.log(f)
                if (f !== -1) {
                    list[f].cart_count--
                    if (list[f].cart_count === 0) {
                        list.splice(f, 1)
                    }
                    total--;
                    return returnState({
                        ...state,
                        list,
                        amount: list.reduce((total: number, current: any) => total + current.cart_count * current.real_price, 0),
                        total
                    })
                }

                return state;


            }
        case CART_ITEM_INCREMENT:
            {
                let { list, total } = state;

                let f = list.findIndex(e => e._id === action.payload)
                if (f !== -1) {
                    list[f].cart_count++
                    total++;
                    return returnState({
                        ...state,
                        list,
                        amount: list.reduce((total: number, current: any) => total + current.cart_count * current.real_price, 0),
                        total
                    })
                }

                return state;
            }
        case CART_REMOVE_ITEM:
            let { list, total } = state;
            let f = list.findIndex(e => e._id === action.payload)
            if (f !== -1) {
                total -= list[f].cart_count;
                list.splice(f, 1)
                return returnState({
                    ...state,
                    list,
                    amount: list.reduce((total: number, current: any) => total + current.cart_count * current.real_price, 0),
                    total
                })
            }
            return state;

        case CART_SHIPPING_OPTION:

            return returnState({
                ...state,
                shippingFee: action.payload.price,
                shippingSelected: action.payload.option
            })

        case CART_PAYMENT_OPTION:

            return returnState({
                ...state,
                paymentMethod: action.payload
            })

        default:
            return state;
    }
}