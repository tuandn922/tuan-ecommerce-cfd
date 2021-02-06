import { CATEGORY_FINISH } from '../actions/type'


let initState: any = {
    list: []
}





export default function (state: any = initState, action: any) {

    switch (action.type) {
        case CATEGORY_FINISH:
            return { list: action.payload }
        default: return state;
    }
    return state;
}