import { convertObjToQueryURL, getQueryParam } from "../../hooks/queryURL";

export default function getQueryString(urlParams: any, props?: { data?: Object, remove?: Object }) {
    let queryString = getQueryParam()


    let catID = urlParams?.cat?.replace(/[^0-9]/g, '');
    if (catID) {
        queryString.categories = catID;
    }



    if (props?.remove) {
        for (let i in props.remove) {
            delete queryString[i]
        }
    }

    if (props?.data) {
        queryString = Object.assign(queryString, props.data);
    }

    if (!queryString.sort) {
        queryString.sort = 'real_price.-1'
    }





    return convertObjToQueryURL(queryString)
}