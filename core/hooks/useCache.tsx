import { useState } from "react";
import { useLocation } from "react-router-dom";
import SessionStorage from "../SessionStorage";

let store = {}

export function get(name, callback) {

    let data = store?.[name] ?? null;

    if (!data) {
        data = callback();
    } else {
        return data;
    }

    store[name] = data;
    return store[name];
}

export function useCache(name: string, defaultValue : any) {
    let data = defaultValue;
    let location = useLocation();
    let check = false;

    if (name in store) {
        data = store[name]
        check = true;
    } else if (location?.state?.[name]) {
        data = location.state[name]
        check = true;

    } else {
        let session = SessionStorage.get(name);
        if (session) {
            data = session
            check = true;
        }
    }

    let [state, setState] = useState(data);

    function updateState(value) {
        if(typeof value === 'function'){
            let val = value(state);
            SessionStorage.set(name, val);
            store[name] = val;
        }else{
            SessionStorage.set(name, value);
            store[name] = value;
        }
        
        setState(value)
    }

    return [state, updateState, check];
}
