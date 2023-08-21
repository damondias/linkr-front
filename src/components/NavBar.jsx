import { useState } from "react"
import { NavBarBody, NavBarOptions, NavBarSearchBar, NavBarUser } from "../styles/NavBarStyle"
import { useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function NavBar(){
    const {user, logOut} = useAuth()
    const [hidden,setHidden] = useState(true)
    const location = useLocation()

    if(location.pathname=="/sign-up"||location.pathname=="/") return

    return(
        <NavBarBody>
            <p>linkr</p>
            <NavBarUser>
                <NavBarOptions $hidden={hidden}>
                    <ul>
                        <li>
                            <p onClick={()=>logOut()}>Logout</p>
                        </li>
                    </ul>
                </NavBarOptions>
                <ion-icon name={hidden?"chevron-down-outline":"chevron-up-outline"} onClick={()=>setHidden(!hidden)}></ion-icon>
                <img src={user?user.image:""}/>
            </NavBarUser>
        </NavBarBody>
    )
}