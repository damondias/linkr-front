import { useEffect, useState } from "react"
import { DebounceInput } from "react-debounce-input"
import { SearchBarBody, OptionArea, Icon } from "../styles/SearchBarStyle"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import api from "../services/api"
import {FaMagnifyingGlass} from "react-icons/fa6"

export default function SearchBar(){
    const nav = useNavigate()
    const location = useLocation()
    const [search,setSearch] = useState("")
    const [results,setResults] = useState([])
    const {user} = useAuth()

    useEffect(()=>{
        if(search!=""){
            api.getSearch(user?.token,search)
            .then(r=>{setResults(r.data)})
            .catch(error=>console.log(error.message))
        }
    },[search])

    if(location.pathname=="/sign-up"||location.pathname=="/") return

    function Send(e){
        console.log(e)
        if(e!="no"){
            nav(`/user/${e}`)
            setSearch("")
            setResults([])
        }else{
            let users = results.filter(u=>u.username==search)
            if(users.length==1){
                nav(`/user/${users[0].id}`)
                setSearch("")
                setResults([])
            }
        }
    }

    function selectOption(option){
        setSearch(option.username)
        Send(option.id)
    }

    function handleSubmit(e){
        e.preventDefault()
        Send("no")
    }

    return(
        <SearchBarBody>
            <form onSubmit={e=>handleSubmit(e)}>
                <DebounceInput minLength={3} debounceTimeout={300}
                onChange={e=>setSearch(e.target.value)} value={search}/>
                <Icon onClick={()=>Send("no")}></Icon>
                <OptionArea>
                    {results.map(e=>{return(
                        <div onClick={()=>selectOption(e)}>
                            <img src={e.image}/> {e.username}
                        </div>
                )})}
                </OptionArea>
            </form>
        </SearchBarBody>
    )
}