import React, {useState} from 'react'
import axios from 'axios'

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
                    <h2 className='h2-red'>Create an account</h2>

                    <label>Name</label>
                    <input name='username' type="text" value={formData.name} placeholder="Name" onChange={handleChange} required={true} disabled={loading} />

                    <label>Email address</label>
                    <input name='email' type="email" value={formData.email} placeholder="Email" onChange={handleChange} disabled={loading} />

                    <label>Password</label>
                    <input name='password' type="password" value={formData.password} placeholder="Password" onChange={handleChange} required={true} disabled={loading} />
                    <br />
                    <br />
                    <button className='btn-o-red' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
