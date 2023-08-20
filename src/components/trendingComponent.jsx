import { useEffect, useState } from "react"
import { TrendingBody } from "../styles/trendingCompStyle"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function TrendingComponent(){
    const nav = useNavigate()
    const [trends,setTrends] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URI}/hashtag`)
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