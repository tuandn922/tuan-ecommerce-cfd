import { Api } from "../helper"

export default {
    login: (data: any) => {
        return Api('login').post({
            body: data
        })


    },
    logout: (_id: string) => {
        return Api('logout').post({
            body: {
                _id
            }
        })
    },
    updateInfo: (data: { name: string, phone: string, gender: string, password?: string, oldPassword?: string, changePassword: Boolean, birthday: Number }) => {
        return Api('update-profile').post({
            body: data
        })
    },
    register: (data: { email: string, password: string, name: string }) => {
        return Api('register').post({
            body: data
        })
    },
}