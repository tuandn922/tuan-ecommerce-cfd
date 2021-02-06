import { CATEGORY_FINISH } from './type'

export function loadCategories(data: any) {
    return {
        type: CATEGORY_FINISH,
        payload: data
    }
}