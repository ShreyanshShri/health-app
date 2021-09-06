import React, {useState} from 'react'

const Navigator = ({switchPage}) => {
    return (
        <ul>
            <li onClick={() => switchPage(1)}>Stats</li>
            <li onClick={() => switchPage(2)}>Profile</li>   
            <li onClick={() => switchPage(3)}>Chats</li>   
        </ul>
    )
}

export default Navigator
