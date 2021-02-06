import React, { useContext, useEffect, useState } from 'react';
import Api from '../Api';
import { useCache } from '../Cache';
import LocalStorage from '../LocalStorage';


export let AuthContext = React.createContext({});

export function useAuth() : any {
    return useContext(AuthContext)
}


export default function AuthProvider({ children }) {
    // let [user, setUser] = useState({})
    let [user, setUser] = useCache('user-info', null);

    let [loading, setLoading] = useState(!user)

    useEffect(() => {
        if(!user){
            try{
                let user = LocalStorage.get('user');
                if(user){
                    getInfo();
                }else{
                    throw 'NOT USER'
                }
                
            }catch(err){
                setLoading(false)
            }
        }
        
        
        
    }, []) 

    // useEffect(() => {
    //     let user = localStorage.getItem('user');
    //     if (user) {
    //         user = JSON.parse(user);

    //         getInfo(user);
    //     } else {
    //         setLoading(false);
    //     }


    // }, [])


    function getInfo() {
        Api('api/get-user-info').get()
            // fetch('http://localhost:8888/api/get-user-info', {
            //     headers: {
            //         'Authorization': `Bear ${user.accessToken}` 
            //     }
            // })
            .then(res => {
                if (res && res.accessToken) {
                    setUser(res);
                    LocalStorage.set('user', res);
                    setLoading(false);
                }

            })
    }




    function login(user) {


        return fetch('https://cfd-reactjs.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }

            })
            .then(res => {
                if (res.error) {
                    return res
                } else {
                    // LocalStorage.set('user',res)
                    localStorage.setItem('user', JSON.stringify(res));
                    setUser(res)
                }
            })

    }

    let value = {
        user,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}