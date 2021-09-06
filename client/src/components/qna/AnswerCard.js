import React from 'react'

const AnswerCard = ({username, profile, answer, postedAt}) => {
    return (
        <div className='answer-card'>
            <p>{answer}</p>
            <div className='q-user-info'>
                <img src={`/uploads/${profile}`} /><p>{username}</p>
                <span>{postedAt}</span>
            </div>
        </div>
    )
}

export default AnswerCard
