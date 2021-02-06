import { CART_ADD_ITEM, CART_CLOSE, CART_ITEM_DECREMENT, CART_ITEM_INCREMENT, CART_OPEN, CART_PAYMENT_OPTION, CART_REMOVE_ITEM, CART_SHIPPING_OPTION } from "./type";

export function openCart() {
    return {
        type: CART_OPEN
    }
}

export function closeCart() {
    return {
        type: CART_CLOSE
    }
}

export function cartAddItem(data: any) {
    data = JSON.parse(JSON.stringify(data))

    return {
        type: CART_ADD_ITEM,
        payload: data
    }
}

export function itemIncrement(index: number) {
    return {
        type: CART_ITEM_INCREMENT,
        payload: index
    }
}

export function itemDecrement(id: any) {
    return {
        type: CART_ITEM_DECREMENT,
        payload: id
    }
}

export function deleteItem(id: any) {
    return {
        type: CART_REMOVE_ITEM,
        payload: id
    }
}

export function selectShippingOption(data: {
    price: number,
    option: 'giao_thuong' | 'giao_nhanh'
}) {
    return {
        type: CART_SHIPPING_OPTION,
        payload: data
    }
}

export function selectPayment(data: any) {
    return {
        type: CART_PAYMENT_OPTION,
        payload: data
    }
}