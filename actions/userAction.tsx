import { User } from "../api";
import { LocalStorage } from "../helper";
import { addToken } from "../helper/Api";
import { USER } from "./type";

export function fetchData() {

}

export function userLogin(params: { username: string, password: string }) {
    return {
        type: USER.LOGIN,
        payload: params
    }
}

export async function fetchLogin(params: { username: string, password: string }) {
    try {
        // let formData = new FormData();
        // formData.append('username', params.username)
        // formData.append('password', params.password)
        let response: any = await User.login(params)

        addToken(response.data.token)

        return response;
    } catch (err) {
        console.log(err)
    }
}

export function logout() {

    return {
        type: USER.LOGOUT,
    }
}

export function fetchLogout(data: any) {
    return User.logout(LocalStorage.get('token')._id)
}

export function updateProfile(data: any) {

    return {
        type: USER.UPDATE,
        payload: data
    }
}

export async function fetchUpdateProfile(data: any) {
    return User.updateInfo(data)
}


export function register(data: any) {
    return {
        type: USER.REGISTER,
        payload: data
    }
}

export async function fetchRegister(data: any): Promise<any> {
    let result: any = User.register(data)

    addToken(result.data.token)

    return result;
}


