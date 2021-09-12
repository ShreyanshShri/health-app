import React, {useState} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

import MetaTags from '../components/MetaTags'

const Login = () => {


    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [checkBox, setCheckBox] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const handleChange = (event) => {
        setFormData(prevData => {
            return {...prevData, [event.target.name]: event.target.value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        submitForm()
    }

    const submitForm = async () => {
        try {
            setLoading(true)
            let res;
            if(checkBox === true) {
                res = await axios.post('https://healthplusplus.herokuapp.com/consultant/login', formData)
            } else {
                res = await axios.post('https://healthplusplus.herokuapp.com/user/login', formData)
            }
            setLoading(false)
            setFormData({
                email: '',
                password: ''
            })
            localStorage.setItem('authKey', res.data.authKey)
            localStorage.setItem('userID', res.data.id)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('isConsultant', checkBox)
            setRedirect(true)
        } catch (err) {
            setLoading(false)
            console.log(err.response)
            alert("An error Occured")
        }

    }

    return (
        <div>
            <MetaTags 
                title='Health++ - Login'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='login page'
            />
            <form onSubmit={handleSubmit} className='container'>
            <h2><span className='color-green'>W</span>elcome <span className='color-green'>B</span>ack</h2>

                    <label>Email address</label>
                    <input className='form-control' name='email' type="email" value={formData.email} placeholder="Email" onChange={handleChange} disabled={loading} />

                    <label>Password</label>
                    <input className='form-control' name='password' type="password" value={formData.password} placeholder="Password" onChange={handleChange} required={true} disabled={loading} />
                    <br />
                    <input type='checkbox' checked={checkBox} onChange={(e) => setCheckBox(e.target.checked)} />
                    <span>Login as Consultant</span>
                    <br />
                    <button className='btn btn-primary' type="submit">Submit</button>

                    <br/><br /><Link to='/signup'>Create a new Account</Link>
                    {redirect && <Redirect to='/dashboard' />}
            </form>
        </div>
    )
}

export default Login
