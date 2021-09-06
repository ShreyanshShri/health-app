import React from 'react'
import { Link } from 'react-router-dom'

const QuestionCard = ({id, username, profile, content, postedAt}) => {
    return (
        <div>
            <p>{content}</p>
            <div className='q-user-info'>
                <img src={`/uploads/${profile}`} /><p>{username}</p>
                <span>{postedAt}</span>
            </div>
            <Link to={`/qna/${id}`}>See</Link>
        </div>
    )
}

export default QuestionCard
