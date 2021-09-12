import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

import ProfileNavigator from './ProfileNavigator'
import Answers from './Answers'
import Comments from './Comments'
import Loader from '../../layout/Loader'

import './style.css'

const Profile = () => {

    const [user, setUser] = useState(false)
    const [page, switchPage] = useState(1)

    const fetchUser = async () => {
        try {
            let res;
            if(localStorage.getItem('isConsultant') === 'true') {
                console.log('herre')
                res = await axios.get(`https://healthplusplus.herokuapp.com/consultant/get/${localStorage.getItem('userID')}`)
                setUser(res.data.consultant)
            } else {
                res = await axios.get(`https://healthplusplus.herokuapp.com/user/get/${localStorage.getItem('userID')}`)
                setUser(res.data.user)
            }
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
            <div className='user-stats container'>
                {user ? <React.Fragment>
                <div className='d-flex align-items-center justify-content-center' style={{flexDirection:"column"}}>
                <img src={`https://healthplusplus.herokuapp.com/uploads/${user.profile_pic}`} alt="pfp" className='mb-2 user-avatar-big' />
                <h3>{user.username}</h3>
                <p>{user.about}</p>
                <Link to='/user/edit-profile'><button className='btn btn-outline-primary mb-4'>Update profile</button></Link>
                </div>
                </React.Fragment> : <Loader />}
                <ProfileNavigator page={page} switchPage={switchPage}/>
                {
                    page === 1 ? <Answers /> : <Comments />
                }
            </div>
        </div>
    )
}

export default Profile
