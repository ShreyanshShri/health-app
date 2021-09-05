import React from 'react'
import { Link } from 'react-router-dom'

const QuestionCard = ({id, username, profile, content}) => {
    return (
        <div>
            <p><img src='' alt='pfp' /> {username}</p>
            <p>{content}</p>
            <Link to={`/qna/${id}`}>See</Link>
        </div>
    )
}

export default QuestionCard
