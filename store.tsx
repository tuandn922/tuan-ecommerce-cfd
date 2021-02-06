import { create } from 'domain';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import combineReducers from './reducers';
import mySaga from './sagas'

declare global {
    interface Window {
        devToolsExtension?: Function,
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
    }
}



const sagaMidleware = createSagaMiddleware()

// function middl(){
//     console.log('1111')
// }

const composeEnhancers = typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({}) : compose

let store = createStore(combineReducers, composeEnhancers(applyMiddleware(sagaMidleware)))
// let store = createStore(combineReducers, applyMiddleware(sagaMidleware), window?.devToolsExtension && window.devToolsExtension())

export default store;

sagaMidleware.run(mySaga)