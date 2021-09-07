import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

const Chats = () => {

    const [consultants, setConsultants] = useState(null)
    
    const fetchData = async () => {
        try {
            const res = await axios.get('/consultant')
            setConsultants(res.data.consultants)
        } catch (err) {
            console.log(err.response)
            swal({
                title: "Error !",
                text: `${err.response ? err.response.data.message : "An error occured!"}`,
                icon: "error",
                button: "Try Again",
              })
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {consultants && consultants.map(consultant => {
                return <ConsultantCard 
                        name={consultant.username}
                        email={consultant.email}
                        id={consultant._id}
                        profile={consultant.profile_pic}
                />
            })}
        </div>
    )
}

const ConsultantCard = ({name, email, id, profile}) => {
    return(
        <div>
            <img src={`/uploads/${profile}`} alt='pfp' />
            <h2>{name}</h2>
            <p>{email}</p>
            <Link to={`/chat/${id}`}><button className='btn btn-secondary'>Chat</button></Link>
        </div>
    )
}

export default Chats
