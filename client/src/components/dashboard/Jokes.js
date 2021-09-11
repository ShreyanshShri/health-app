import React, {useState, useEffect} from 'react'
import axios from "axios"

const Jokes = () => {
    const [joke, setJoke] = useState(null)
    
    useEffect(() => {
        fetchJoke()
    }, [])

    const fetchJoke = async () => {
        try {
            const res = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
            setJoke(res.data.joke)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div>
            {joke &&<div dangerouslySetInnerHTML={{__html: joke}}></div>}
        </div>
    )
}

export default Jokes
