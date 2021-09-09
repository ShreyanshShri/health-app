import React from 'react'

const AnswerCard = ({username, profile, answer, postedAt}) => {

    return (
        <div className='answer-card'>
            <h4>{answer}</h4>
            <div className='q-user-info'>
            <div className='d-flex align-items-center'><img src={`/uploads/${profile}`} /><p style={{margin: '0'}}>{username}</p></div>
                <span>{new Date(postedAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default AnswerCard
