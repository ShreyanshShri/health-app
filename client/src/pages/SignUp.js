import React, {useState} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import swal from 'sweetalert'

import MetaTags from '../components/MetaTags'

const SignUp = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [checkBox, setCheckBox] = useState(false)
    const [checkBox2, setCheckBox2] = useState(false)
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
        if (!checkBox2) {
            return swal({
                icon: 'error',
                title: 'Wishlist Karlson on steam now Gamerrzzz!',
                button: 'OK'
            })
        }
        try {
            setLoading(true)
            let res;
            if(checkBox) {
                res = await axios.post('https://healthplusplus.herokuapp.com/consultant/register', formData)
            } else {
                res = await axios.post('https://healthplusplus.herokuapp.com/user/register', formData)
            }
            setLoading(false)
            setFormData({
                name: '',
                email: '',
                msg: ''
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
                title='Health++ - Register'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='register page'
            />
            <form onSubmit={handleSubmit} className='container'>
                    <h2><span className='color-green'>C</span>reate an <span className='color-green'>A</span>ccount</h2>

                    <label>Name</label>
                    <input className='form-control' name='username' type="text" value={formData.name} placeholder="Name" onChange={handleChange} required={true} disabled={loading} />

                    <label>Email address</label>
                    <input className='form-control' name='email' type="email" value={formData.email} placeholder="Email" onChange={handleChange} disabled={loading} />

                    <label>Password</label>
                    <input className='form-control' name='password' type="password" value={formData.password} placeholder="Password" onChange={handleChange} required={true} disabled={loading} />

                    <br />
                    <input type='checkbox' checked={checkBox} onChange={(e) => setCheckBox(e.target.checked)} />
                    <span>Register as Consultant</span>

                    <br />
                    <br />
                    <input type='checkbox' checked={checkBox2} onChange={(e) => setCheckBox2(e.target.checked)} />
                    <span>I've wishlished Karlson on Steam</span>
                    <br />
                    <Link to='https://www.youtube.com/watch?v=GwomfPkMZO8'><button className='btn btn-link'>Oh you dont know what Karlson is :/</button></Link>
                    <br/>
                    <br/>
                    <button className='btn btn-primary mt-2' type="submit">Submit</button>
                    <br/><br /><Link to='/login'>Already have an account? LogIn</Link>

                    {redirect && <Redirect to='/dashboard' />}
            </form>
        </div>
    )
}

export default SignUp
