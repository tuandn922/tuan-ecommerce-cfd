import { call, put } from "redux-saga/effects"
import { USER } from "../actions/type"
import { fetchLogin, fetchLogout, fetchRegister, fetchUpdateProfile } from "../actions/userAction"

export function* watchLogin(action: any) {
    try {
        const data = yield call(fetchLogin, action.payload)
        if (data?.data?._id) {
            yield put({ type: USER.LOGIN_RECEIVE, payload: data.data })
        } else {
            yield put({ type: USER.LOGIN_FAIL, payload: 'Username hoặc password không đúng' })
        }
    } catch (err) {

    }
}


export function* watchUpdateProfile(action: any) {
    try {
        const data: any = yield call(fetchUpdateProfile, action.payload)
        if (data.data) {
            yield put({ type: USER.RECEIVE_UPDATE, payload: data.data })
        } else {
            yield put({ type: USER.ERROR, payload: data.error })
        }
    } catch (er) {

    }
}


export function* watchRegister(action: any) {
    try {
        const data = yield call(fetchRegister, action.payload)
        if (data.data) {
            yield put({ type: USER.REGISTER_RECEIVE, payload: data.data })
            yield put({ type: USER.LOGIN_RECEIVE, payload: data.data })
        } else {
            yield put({ type: USER.ERROR, payload: data.error })
        }
    } catch (er) {

    }
}

export function* watchLogout(action: any) {
    try {
        const data = yield call(fetchLogout, action.payload)
    } catch (err) {

    }
}