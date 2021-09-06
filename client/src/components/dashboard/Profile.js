import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

import ProfileNavigator from './ProfileNavigator'
import Answers from './Answers'
import Comments from './Comments'

const Profile = () => {

    const [user, setUser] = useState(false)
    const [page, switchPage] = useState(1)

    const fetchUser = async () => {
        try {
            
            const res = await axios.get(`/user/get/${localStorage.getItem('userID')}`)
            setUser(res.data.user)
            console.log(res.data.user)
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

        fetchUser()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className='user-stats'>
            <img src={`/uploads/${user.profile_pic}`} alt="pfp" />
                <h3>{user.username}</h3>
                <p>{user.about}</p>
                <Link to='/user/edit-profile'><button className='btn-outline-primary'>Update profile</button></Link>
                <ProfileNavigator switchPage={switchPage}/>
                {
                    page === 1 ? <Answers /> : <Comments />
                }
            </div>
        </div>
    )
}

export default Profile
