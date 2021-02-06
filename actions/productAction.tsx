import { PRODUCT, PRODUCT_DETAIL_FINISH, PRODUCT_DETAIL_LOADING, PRODUCT_FINISH, PRODUCT_LOADING } from './type'

export function fetchProduct(data: any) {
    return {
        type: PRODUCT_FINISH,
        payload: data
    }
}

export function loadingProduct() {
    return {
        type: PRODUCT_LOADING
    }
}


export function loadingProductDetail() {
    return {
        type: PRODUCT_DETAIL_LOADING
    }
}

export function productDetailFinish(data: any) {
    return {
        type: PRODUCT_DETAIL_FINISH,
        payload: data
    }
}

export function getProductDiscount() {
    return {
        type: PRODUCT.DISCOUNT,
    }
}