import { useEffect, useState } from "react"
import { TrendingBody } from "../styles/trendingCompStyle"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import api from "../services/api"

export default function TrendingComponent(){
    const nav = useNavigate()
    const [trends,setTrends] = useState([])
    const {user} = useAuth()

    useEffect(()=>{
        api.getTrends(user?.token)
        .then(r=>setTrends(r.data))
        .catch(error=>console.log(error.message))
    },[])

    return(
        <TrendingBody>
            <p className="title">trending</p>
            <hr/>
            {
                trends.map(e=><p onClick={()=>{nav(`/hashtag/${e.tag}`)}}>#{e.tag}</p>)
            }
        </TrendingBody>
    )
}