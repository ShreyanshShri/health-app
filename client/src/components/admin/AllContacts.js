import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import ContactCard from './ContactCard'

const AllContacts = () => {

    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState([])

    const fetchData = async () => {
        try {
            const res = await axios.post(`https://healthplusplus.herokuapp.com/contact/`, {
                password: sessionStorage.getItem('authToken')
            })
            const data = res.data.contact
            setContacts(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "OK",
              })
        }
    }

    const markAsDone = async (id) => {
        try {
            setLoading(true)
            const res = await axios.post(`https://healthplusplus.herokuapp.com/contact/${id}`, {
                password: sessionStorage.getItem('authToken')
            })
            setLoading(false)
            swal({
                title: res.data.message,
                icon: "success",
                button: "OK",
            })
        } catch (err) {
            setLoading(false)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "OK",
            })
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
            <h1>All FeedBacks</h1>
                {loading && "Loading"}
            {!loading && contacts && contacts.map((contact, index) => {
                console.log(contact)
                return <ContactCard 
                            key={index}
                            id={contact._id}
                            name={contact.name}
                            email={contact.email}
                            phoneNo={contact.phoneNo}
                            message={contact.message}
                            hasContacted={contact.hasContacted}
                            markAsDone={markAsDone}
                            loading={loading}
                        />
            })}
        </div>
    )
}

export default AllContacts