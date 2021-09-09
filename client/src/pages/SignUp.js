import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SignUp = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

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
            const res = await axios.post('/user/register', formData)
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
        } catch (err) {
            setLoading(false)
            console.log(err.response)
            alert("An error Occured")
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='container'>
                    <h2><span className='color-green'>C</span>reate an <span className='color-green'>A</span>ccount</h2>

                    <label>Name</label>
                    <input className='form-control' name='username' type="text" value={formData.name} placeholder="Name" onChange={handleChange} required={true} disabled={loading} />

                    <label>Email address</label>
                    <input className='form-control' name='email' type="email" value={formData.email} placeholder="Email" onChange={handleChange} disabled={loading} />

                    <label>Password</label>
                    <input className='form-control' name='password' type="password" value={formData.password} placeholder="Password" onChange={handleChange} required={true} disabled={loading} />

                    <button className='btn btn-primary mt-2' type="submit">Submit</button>
                    <br/><br /><Link to='/login'>Already have an account? LogIn</Link>
            </form>
        </div>
    )
}

export default SignUp
