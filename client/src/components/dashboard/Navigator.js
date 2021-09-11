import React from 'react'

const Navigator = ({page, switchPage}) => {

    return (
        <ul className='dashboard-navigator'>
            <li onClick={() => switchPage(1)} style={{background:  page===1 && '#eee'}}>Stats</li>
            <li onClick={() => switchPage(2)} style={{background:  page===2 && '#eee'}}>Profile</li>   
            <li onClick={() => switchPage(3)} style={{background:  page===3 && '#eee'}}>Chats</li>   
        </ul>
    )
}

export default Navigator
