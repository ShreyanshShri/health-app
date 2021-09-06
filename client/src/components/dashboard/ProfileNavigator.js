import React from 'react'

const ProfileNavigator = ({switchPage}) => {
    return (
        <ul>
            <li onClick={() => switchPage(1)}>Answers</li>
            <li onClick={() => switchPage(2)}>Comments</li>     
        </ul>
    )
}

export default ProfileNavigator
