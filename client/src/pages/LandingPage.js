import React from 'react'
import {Link} from 'react-router-dom'

import blog from '../assets/blog.jpg'
import caclulator from '../assets/calculator.jpg'
import consultancy from '../assets/consultancy.jpg'
import personalisation from '../assets/personalisation.jpg'
import qna from '../assets/qna.jpg'
import MetaTags from '../components/MetaTags'

import yogaGirl from '../assets/yoga-girl.png'

const LandingPage = () => {
    return (
        <div>
            <MetaTags 
                title='Health++ - A complete solution to all your health problems'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='home page'
            />
             <div className='hero'>
                 <div className=' container flex-one' style={{alignItems: 'center', justifyContent:'space-between', overflow: 'hidden' }}>
                 <div className='hero-text'>
                <h4>Welcome To</h4>
                <h1 style={{fontSize: '3em'}}><span className='color-green'>H</span>ealth<span className='color-green'>++</span></h1>
                <h4>Your Personal <span className='color-green'>H</span>ealth <span className='color-green'>A</span>ssistant</h4>
                <Link to='/signup'><button className='btn btn-outline-primary'>Get Started</button></Link>
                </div>
                <img src={yogaGirl} alt='yoga img' className='yoga-girl' />
                </div>
            </div>
            <div className='features'>
                <div className='feature container'>
                    <img src={personalisation} className='feature-icon' alt='img'></img>
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
                    <img src={qna} className='feature-icon'  alt='img'></img>
                </div>
                <div className='feature container'>
                    <img src={consultancy} className='feature-icon' alt='img'></img>
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
                    <img src={blog} className='feature-icon' alt='img'></img>
                </div>
                <div className='feature container'>
                    <img src={caclulator} className='feature-icon' alt='img'></img>
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
