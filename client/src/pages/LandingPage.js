import React from 'react'
import {Link} from 'react-router-dom'

import blog from '../assets/blog.jpg'
import caclulator from '../assets/calculator.jpg'
import consultancy from '../assets/consultancy.jpg'
import personalisation from '../assets/personalisation.jpg'
import qna from '../assets/qna.jpg'

const LandingPage = () => {
    return (
        <div>
             <div className='hero'>
                <h2>Welcome To</h2>
                <h1>health++</h1>
                <p>A one step solution to all your health problems</p>
            </div>
            <div className='features'>
                <div className='feature container'>
                    <img src={personalisation} className='feature-icon'></img>
                    <div className='content-wrapper'>
                    <h2>Get personalized data</h2>
                    <Link to='/signup'>
                    <button className='btn btn-outline-primary'>Sign Up Now</button>
                    </Link>
                    </div>
                </div>
                <div className='feature bg-grey container'>
                    <div className='content-wrapper'>
                    <h2>Have a question?? Ask in QnA</h2>
                    <Link to='/qna'>
                    <button className='btn btn-outline-primary'>Visit QnA</button>
                    </Link>
                    </div>
                    <img src={qna} className='feature-icon'></img>
                </div>
                <div className='feature container'>
                    <img src={consultancy} className='feature-icon'></img>
                    <div className='content-wrapper'>
                    <h2>Get 1:1 consultancy from our experts</h2>
                    <Link to='/signup'>
                    <button className='btn btn-outline-primary'>Sign Up now</button>
                    </Link>
                    </div>
                </div>
                <div className='feature bg-grey container'>
                    <div className='content-wrapper'>
                    <h2>Useful blogs and health realted tips every week</h2>
                    <Link to='/articles'>
                    <button className='btn btn-outline-primary'>See Articles</button>
                    </Link>
                    </div>
                    <img src={blog} className='feature-icon'></img>
                </div>
                <div className='feature container'>
                    <img src={caclulator} className='feature-icon'></img>
                    <div className='content-wrapper'>
                    <h2>Yoga trainer, calculators and many useful tools</h2>
                    <Link to='/tools'>
                    <button className='btn btn-outline-primary'>Set calorie target</button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
