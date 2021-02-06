import { NavLink } from "react-router-dom"

export default function LoadingLink({...props}){
    async function _handelClick(e){
        e.preventDefault()
        console.log('loading')
    }

    return <NavLink onClick={_handelClick} {...props}/>
}