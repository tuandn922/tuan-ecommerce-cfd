import { PRODUCT_DETAIL_FINISH, PRODUCT_DETAIL_LOADING, PRODUCT_FINISH, PRODUCT_LOADING } from "../actions/type";

let initState: any = {
    list: [],
    paginate: null,
    loading: true,
    detail: null,
    detailLoading: true
}

export default function (state = initState, action: any) {
    switch (action.type) {
        case PRODUCT_FINISH:
            return { ...state, list: action.payload.data, paginate: action.payload.paginate, loading: false }
        case PRODUCT_LOADING:
            return { ...state, loading: true }
        case PRODUCT_DETAIL_LOADING:
            return { ...state, detailLoading: true }
        case PRODUCT_DETAIL_FINISH:
            return { ...state, detail: action.payload, detailLoading: false }
        default: return state;
    }

    return state;
}