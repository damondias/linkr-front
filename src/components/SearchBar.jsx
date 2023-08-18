import { useEffect, useState } from "react"
import { DebounceInput } from "react-debounce-input"
import { SearchBarBody, OptionArea } from "../styles/SearchBarStyle"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

export default function SearchBar(){
    const nav = useNavigate()
    const location = useLocation()
    const [search,setSearch] = useState("")
    const [results,setResults] = useState([])
    const config = {headers:{authorization:"a"}}

    useEffect(()=>{
        if(search!=""){
            axios.get(`${process.env.REACT_APP_API_URI}/users/find/${search}`,config)
            .then(r=>{setResults(r.data)})
            .catch(error=>console.log(error.message))
        }
    },[search])

    if(location.pathname=="/sign-up"||location.pathname=="/") return

    function selectOption(option){
        setSearch(option.username)
        nav(`/user/${option.id}`)
        setSearch("")
        setResults([])
    }

    function handleSubmit(e){
        e.preventDefault()
        let users = results.filter(u=>u.username==search)
        if(users.length==1){
            nav(`/user/${users[0].id}`)
            setSearch("")
            setResults([])
        }
    }

    return(
        <SearchBarBody>
            <form onSubmit={e=>handleSubmit(e)}>
                <DebounceInput minLength={3} debounceTimeout={300}
                onChange={e=>setSearch(e.target.value)} value={search}/>
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