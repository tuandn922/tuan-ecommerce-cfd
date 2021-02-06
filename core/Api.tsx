import Hook from "./Hook";
import LocalStorage from "./LocalStorage";

import { ApolloClient, gql, InMemoryCache } from '@apollo/client';





const domain = 'https://cfd-reactjs.herokuapp.com/';
// const domain = '';


const GraphQL = new ApolloClient({
    uri: `${domain}graphql`,
    cache: new InMemoryCache()
});

export const GraphQLClient = {
    query: (qr: string) => {
        return GraphQL.query({
            query: gql`${qr}`
        })
    }
}


let headers: any = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjA3MzE1MDg2LCJleHAiOjIwODA2NzkwODZ9.cDPTTv6nN8z5PwBQh4EeYGGvO0rFxb_TR9wReFedtHo`
}

let user : any = localStorage.getItem('user');
let _refreshToken;
if (user) {
    user = JSON.parse(user);
    headers = {
        ...headers,
        'Authorization': `Bearer ${user.accessToken}`
        // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjA3MzE1MDg2LCJleHAiOjIwODA2NzkwODZ9.cDPTTv6nN8z5PwBQh4EeYGGvO0rFxb_TR9wReFedtHo`

    }
    _refreshToken = user.refreshToken;
}

Hook.addAction('setLocalStorage_user', (value: any) => {
    console.log('setLocalStorage_user');
    if (value && value.accessToken) {
        headers.Authorization = `Bearer ${value.accessToken}`
    }
})


// async function checkRefreshToken(res, callback) {
//     if (res.status === 200) {
//         return await res.json()
//     }


//     if (res.status === 403) {

//         res = await res.json();
//         console.log(res)

//         if (res.error_code === 'TOKEN_EXPIRED') {
//             let check = await refreshToken();
//             if (check) {
//                 return callback();
//             }
//         }
//     }
// }


// function cacheError(res) {
//     if (res.status === 200) {
//         return res.json()
//     }

//     throw res;
// }

let resendApi = true;
async function refreshToken() {
    let user = LocalStorage.get('user');
    if (resendApi) {
        if (user?.refreshToken) {
            resendApi = false;
            let res : any = await fetch(domain + 'api/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken: user.refreshToken
                })
            })

            if (res.status === 200) {
                res = await res.json()
                if (res.accessToken) {
                    user.accessToken = res.accessToken;
                    // headers.Authorization = `Bear ${res.accessToken}`

                    LocalStorage.set('user', user)
                    resendApi = true;
                    return true;
                }
            }
            resendApi = true;

        }
    } else {
        return new Promise((resolve, reject) => {
            Hook.addActionOneTime('setLocalStorage_user', (value: any) => {
                resolve(true);
            })
        })
    }


    return false;
}


async function callApi(...params: [input: RequestInfo, init?: RequestInit]) {
    let res : any = await fetch(...params);
    if (res.status === 200) {
        return await res.json()
    }

    if (res.status === 403) {

        res = await res.json();

        if (res.error_code === 'TOKEN_EXPIRED') {
            let check = await refreshToken();
            if (check) {
                let res = await fetch(...params);
                if (res.status === 200) {
                    return await res.json()
                }
            }
        }
    }
}

export default (url: string) => {

    return {
        get: () => {
            let params : [input: RequestInfo, init?: RequestInit] = [domain + url, { headers }]
            return callApi(...params)
        },
        post: (data: any) => {
            let params : [input: RequestInfo, init?: RequestInit] = [domain + url, { headers, ...data, method: 'POST' }]
            return callApi(...params)
        },
        put: (data:any) => {
            let params: [input: RequestInfo, init?: RequestInit] = [domain + url, { headers, ...data, method: 'PUT' }]
            return callApi(...params)
        },
        delete: () => {
            let params: [input: RequestInfo, init?: RequestInit] = [domain + url, { headers, method: 'DELETE' }]
            return callApi(...params)
        }
    }
}


// let domain = 'https://cfd-reactjs.herokuapp.com/';

// let headers = {
//     'Content-Type': 'application/json'
// }
// let user = {}
// try {
//     user = JSON.parse(localStorage.getItem('user'));
//     headers.Authorization = `Bearer ${user.accessToken}`
// } catch (err) {

// }



// async function cacheTokenExpired(res, head) {
//     if (res.status === 403) {
//         res = await res.json()
//         if (res.error_code === 'TOKEN_EXPIRED') {
//             let res2 = await fetch(domain + 'api/refresh-token', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     refreshToken: user.refreshToken
//                 })
//             })
//             if (res2.status === 200) {
//                 res2 = await res2.json()
//                 if (res2.accessToken) {
//                     try {
//                         let user = JSON.parse(localStorage.getItem('user'));
//                         user.accessToken = res2.accessToken;
//                         localStorage.setItem('user', JSON.stringify(user))
//                         headers.Authorization = `Bearer ${user.accessToken}`

//                         return fetch(...head).then(res => res.json())

//                     } catch (err) {

//                     }
//                 }
//             }
//         }
//     } else {
//         return res.json();
//     }
// }

// export default function Api(url) {

//     return {
//         get: () => {

//             let head = [domain + url, {
//                 headers
//             }]

//             return fetch(...head).then(res => cacheTokenExpired(res, head))
//         },
//         post: (data) => {
//             let head = [domain + url, { headers, method: 'POST' }]

//             return fetch(...head).then(res => cacheTokenExpired(res, head))
//         },
//         put: () => { 
//             let head = [domain + url, { headers, method: 'PUT' }]

//             return fetch(...head).then(res => cacheTokenExpired(res, head))
//         },
//         delete: () => { 
//             let head = [domain + url, { headers, method: 'DELETE' }]

//             return fetch(...head).then(res => cacheTokenExpired(res, head))
//         },
//     }
// }