import React from 'react'

const ProfileNavigator = ({page, switchPage}) => {
const ulStyles={
        display: 'flex',
        padding: '0',
        flexWrap: 'wrap',
    }
    const liStyles={
        marginRight: '10px',
        listStyleType: 'none',
        padding: '10px',
        cursor: 'pointer',
    }
    return (
        <ul className='profile-navigator' style={ulStyles}>
            <li onClick={() => switchPage(1)} style={{...liStyles, background:  page===1 && '#eee'}}>Answers</li>
            <li onClick={() => switchPage(2)} style={{...liStyles, background:  page===2 && '#eee'}}>Comments</li>
        </ul>
    )
}

export default ProfileNavigator
