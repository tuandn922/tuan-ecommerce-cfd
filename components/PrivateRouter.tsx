import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import Login from '../pages/Login/Login'

export default function PrivateRouter(props: any) {
    const user = useSelector((state: any) => state.user)
    if(user.login) {
        return <Route {...props} />
    }
    return (
       <Login />
    )
}
