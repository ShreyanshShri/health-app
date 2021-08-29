  
import React from 'react'

const AdminNav = ({page, switchpage}) => {
    const ulStyles={
        display: 'flex',
        padding: '0'
    }
    const liStyles={
        marginRight: '10px',
        listStyleType: 'none',
        padding: '10px',
        cursor: 'pointer',
    }
    return (
        <div className='container'>
            <ul style={ulStyles}>
                <li onClick={() => switchpage('articles')} style={{...liStyles, background:  page==='articles' && '#eee'}}>Articles</li>
                <li onClick={() => switchpage('contacts')} style={{...liStyles, background:  page==='contacts' && '#eee'}}>Feedbacks</li>
            </ul>
        </div>
    )
}

export default AdminNav