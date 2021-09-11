import axios from 'axios'
import React, {useState} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

import Loader from '../../layout/Loader'

const Inbox = () => {
    
    const [chats, setChats] = useState(null)

    const fetchData = async () => {
        try {
            const res = await axios.post('/consultance', {
                password: localStorage.getItem('authKey')
            })
            setChats(res.data.chats)
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
    
    useState(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return(
        <div>
            {chats ? chats.map(chat => {
                let userId;
                if(localStorage.getItem('userID') === chat.client_id) {
                    userId = chat.consultant_id;
                } else if(localStorage.getItem('userID') === chat.consultant_id){
                    userId = chat.client_id;
                }

                return <div className='container consultant-card mt-2' style={{paddingTop: '20px', paddingBottom: '10px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '10px'}}>
                <h4>{chat.client === localStorage.getItem('username') ? chat.consultant : chat.client}</h4>
                <p>{chat.chats[chat.chats.length - 1].text}</p>
                <Link to={`/chat/${userId}`}><button className='btn btn-secondary'>Chat</button></Link>
            </div>
            }) : <Loader />}
        </div>
    )
}

export default Inbox