import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

import Loader from '../../layout/Loader'
import Inbox from './Inbox'

const Chats = () => {

    const [consultants, setConsultants] = useState(null)
    const [page, switchPage] = useState(1)
    
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

    const ulStyles={
        display: 'flex',
        padding: '0',
        flexWrap: 'wrap',
    }
    const liStyles={
        marginRight: '10px',
        listStyleType: 'none',
        padding: '10px',
        cursor: 'pointer',
    }

    return (
        <div className='container'>
            <ul className='profile-navigator' style={ulStyles}>
                <li onClick={() => switchPage(1)} style={{...liStyles, background:  page===1 && '#eee'}}>Your Inbox</li>
                <li onClick={() => switchPage(2)} style={{...liStyles, background:  page===2 && '#eee'}}>Find Consultant</li>
            </ul>
            {page === 1 ? <Inbox /> : <ConsultantList consultants={consultants} />}      
        </div>
    )
}

const ConsultantList = ({consultants}) => {
    return (
    <div>
    {consultants ? consultants.map(consultant => {
    return <ConsultantCard 
            name={consultant.username}
            email={consultant.email}
            id={consultant._id}
            profile={consultant.profile_pic}
    />
    }) : <Loader />}
    </div>
    )
}

const ConsultantCard = ({name, email, id, profile}) => {
    return(
        <div className='container consultant-card mt-2' style={{paddingTop: '20px', paddingBottom: '10px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '10px'}}>
            <div className='d-flex'>
                <img src={`/uploads/${profile}`} alt='pfp' />
                <h3 style={{marginLeft: '20px'}}>{name}</h3>
            </div>
            <p>{email}</p>
            <Link to={`/chat/${id}`}><button className='btn btn-secondary'>Chat</button></Link>
        </div>
    )
}

export default Chats
