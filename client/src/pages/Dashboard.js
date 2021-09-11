import React, {useState, useEffect} from 'react'

import Stats from '../components/dashboard/Stats'
import Profile from '../components/dashboard/Profile'
import Chats from '../components/dashboard/Chats'
import Navigator from '../components/dashboard/Navigator'

import './style.css'

const Dashboard = () => {

    const [user, setUser] = useState(null)
    const [page, setPage] = useState(1)

    const switchPage = (page) => {
        setPage(page)
    }

    return (
        <div className='dashboard-wrapper'>
            <Navigator page={page} switchPage={switchPage} />
            <div className='dashboard-content container'>
            {
                page === 1 ? <Stats /> :
                page === 2 ? <Profile /> : 
                page === 3 ? <Chats /> : null
            }
            </div>
        </div>
    )
}

export default Dashboard
