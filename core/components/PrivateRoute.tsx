import React from 'react';
import { Route } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import Login from '../../pages/login';
import { useAuth } from '../hooks/useAuth';

// export default function PrivateRoute({component: Component, ...prop}) {

//     let { user } = useAuth();
//     console.log(Component.prepare)
//     return <Route {...prop} render={(props) => {
        
//         if(user.name){
//             return <Component {...props} />
//         }

//         return <Login {...props}/>
//     }}/>
// }


export default function PrivateRoute(props){
    let {user} = useAuth();
    
    if(user){
        return <Route {...props}/>
    }

    return <Route {...props} component={Login}/>

}