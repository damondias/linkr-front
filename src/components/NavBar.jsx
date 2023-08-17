import { useState } from "react"
import { NavBarBody, NavBarOptions, NavBarUser } from "../styles/NavBarStyle"
import { useLocation } from "react-router-dom"

export default function NavBar(){
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
                            <p onClick={()=>"Log out function"}>Logout</p>
                        </li>
                    </ul>
                </NavBarOptions>
                <ion-icon name={hidden?"chevron-down-outline":"chevron-up-outline"} onClick={()=>setHidden(!hidden)}></ion-icon>
                <img/>
            </NavBarUser>
        </NavBarBody>
    )
}