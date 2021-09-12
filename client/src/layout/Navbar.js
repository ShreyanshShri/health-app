import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import './style.css'

const Navbar = ({history}) => {

    const [navIsToggled, setNavState] = useState(window.innerWidth > 726)
    const [pageOffset, setPageOffset] = useState(window.pageYOffset)
    const [ulActive, setActive] = useState(0)

    const ulStyles = {
        left: navIsToggled ? "0" : "-120vw"
    }

    const redColor = {
        color:'#009abb'
    }

    const fontColor = `rgb(255, 255, 255)`

    const navStyles = {
        background: `rgb(30, 30, 30)`
    }

    useEffect(function() {
        window.addEventListener('scroll', () => {
            setPageOffset(window.pageYOffset)    
        })

        return () => {
            window.removeEventListener('scroll', () => {
                setPageOffset(window.pageYOffset)
            })
        }
        // eslint-diable-next-line
    }, [])

    useEffect(() => {

        let str = window.location.pathname

        if (str.includes('tutorials')) {
            setActive(1)
        } else if (str.includes('blog')) {
            setActive(2)
        } else {
            setActive(0)
        }
        // eslint-disable-next-line
    }, [window.location.pathname, history])

    return (
        <nav style={navStyles}>
            <Link to='/' style={{color: fontColor}}><h2><span style={redColor}>H</span>ealth<span style={redColor}>++</span></h2></Link>
            <ul style={ulStyles}>
                <h2 onClick={() => setNavState(false)}>X</h2>
                {/* eslint-disable-next-line */}
                <li onClick={() => setActive(0)} className={ulActive === 0 && 'ul-active'}><Link to='/' style={{color: fontColor}}>Home</Link></li>
                {/* eslint-disable-next-line */}
                <li onClick={() => setActive(1)} className={ulActive === 1 && 'ul-active'}><Link to='/articles' style={{color: fontColor}}>Articles</Link></li>
                {/* eslint-disable-next-line */}
                <li onClick={() => setActive(2)} className={ulActive === 2 && 'ul-active'}><Link to='/tools' style={{color: fontColor}}>Tools</Link></li>
                {/* eslint-disable-next-line */}
                <li onClick={() => setActive(3)} className={ulActive === 3 && 'ul-active'}><Link to='/qna' style={{color: fontColor}}>QnA</Link></li>
                 {/* eslint-disable-next-line */}
                 {localStorage.getItem('authKey') ? <li className={'ul-fill'}><Link to='/dashboard'>Dashboard</Link></li> : <li className={'ul-fill'}><Link to='/signup'>Sign Up</Link></li>}
            </ul>
            {!navIsToggled && <h2 className='hamburger' onClick={() => setNavState(true)}>
                <div className='bar-1'></div>
                <div className='bar-2'></div>
                <div className='bar-3'></div>
            </h2>}
        </nav>
    )
}

export default Navbar