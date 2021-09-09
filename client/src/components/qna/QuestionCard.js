import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const QuestionCard = ({id, username, profile, content, postedAt}) => {
    return (
        <div className='question-card'>
            <h4>{content}</h4>
            <div className='q-user-info'>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img className='user-avatar' src={`/uploads/${profile}`} /><p style={{marginLeft: '10px'}}>{username}</p>
                </div>
                <span className='text-muted'>{new Date(postedAt).toLocaleDateString()}</span>
            </div>
            <Link to={`/qna/${id}`}><button className='btn btn-outline-primary mt-2'>Read more</button></Link>
        </div>
    )
}

export default QuestionCard
