import React, {useState} from 'react'

const ContactCard = ({id, name, email, phoneNo, message, hasContacted, markAsDone}) => {
    const [readMore, setReadMore] = useState(false)
    console.log(hasContacted)
    return (
        <div className='content'>
            <h3>{name}</h3>
            <p className='row'>
                <div className='col-md-12 col-lg-6 col-sm-12'>Phone No: {phoneNo}</div>
                <div className='col-md-12 col-lg-6 col-sm-12'>Email: {email}</div>
            </p>
            <p>
                {readMore ? message : message.substring(0, 100) + '...'}
            </p>
            <button className='btn btn-primary' onClick={() => setReadMore(prev => !prev)}>{!readMore ? "Read More" : "Read Less"}</button>
            <button 
                className={hasContacted ? 'btn btn-secondary ml-2' : 'btn btn-outline-secondary ml-2'}
                onClick={() => markAsDone(id)}
            >
                {hasContacted ? "Mark as pending" : 'Mark as done'}
            </button>
        </div>
    )
}

export default ContactCard