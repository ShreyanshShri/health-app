import React from 'react'

import rickroll from './rickroll.gif'

const NotFound = () => {
    return (
        <div style={{
            display:'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent:'center',
            marginTop:'20px',
            marginBottom: '20px'
        }}>
            <h1 className='h2-red'>404</h1>
            <h1>Page Not found</h1>
            <img src={rickroll} alt='Rickroll meme' />
        </div>
    )
}

export default NotFound
