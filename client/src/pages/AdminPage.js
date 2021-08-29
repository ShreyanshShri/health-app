import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import AdminLogin from '../components/admin/AdminLogin'
import AllArticles from '../components/admin/AllArticles'
import AllContacts from '../components/admin/AllContacts'
import AdminNav from '../components/admin/AdminNav'

const AdminPage = () => {

    const [page, switchpage] = useState('articles')
    // const hasAuthToken = sessionStorage.getItem('authToken') != undefined && sessionStorage.getItem('authToken') != null && sessionStorage.getItem('authToken') !== ''
    const [verified, setVerified] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const verifyAuthToken = async () => {
        try {
            await axios.post('/auth/verify', {
                authToken: sessionStorage.getItem('authToken')
            })
            setVerified(true)
        } catch (err) {
            setVerified(false)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })        
        }
    }

    useEffect(() => {
        verifyAuthToken()
        // eslint-disable-next-line
    }, [redirect])

    return (
        <div>
            <h2 className='container'>Admin Page</h2>
            <AdminNav
                page={page}
                switchpage={switchpage}
            />
            {verified === false ? <AdminLogin 
                redirect={redirect}
                setRedirect={setRedirect}
            /> :
                page === 'articles' ? <AllArticles page={page} /> : 
                <AllContacts page={page} />
            }
        </div>
    )
}

export default AdminPage