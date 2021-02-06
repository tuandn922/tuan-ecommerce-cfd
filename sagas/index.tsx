import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { USER } from '../actions/type'
import { fetchLogin } from '../actions/userAction'
import { watchLogout, watchRegister, watchUpdateProfile, watchLogin } from './watchUser'

export default function* mySaga() {

    yield takeLatest(USER.LOGIN, watchLogin)

    yield takeLatest(USER.LOGOUT, watchLogout)

    yield takeLatest(USER.UPDATE, watchUpdateProfile)

    yield takeLatest(USER.REGISTER, watchRegister)
}