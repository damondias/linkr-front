import { useState } from "react"
import { NavBarBody, NavBarOptions, NavBarUser } from "../styles/NavBarStyle"

export default function NavBar(){
    const [hidden,setHidden] = useState(true)

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