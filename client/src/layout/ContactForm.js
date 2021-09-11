import React, {useState} from 'react'
import axios from 'axios'

const ContactForm = () => {
    // eslint-disable-next-line
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            msg: ''
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
                await axios.put('/contact', formData)
                setLoading(false)
                setFormData({
                    name: '',
                    email: '',
                    msg: ''
                })
                alert("Your response has been submitted")
            } catch (err) {
                setLoading(false)
                console.log(err.response)
                alert("An error Occured")
            }

        }
    
        return (
            <div className='container-fluid bg-grey'>
            <form onSubmit={handleSubmit}>
                    {/* {loading && <Loader />} */}
                    <h2 className='h2-red'>Send Feedback</h2>

                        <label>Name</label>
                        <input className='form-control' name='name' type="text" value={formData.name} placeholder="Name" onChange={handleChange} required={true} disabled={loading} />

    

                        <label>Email address</label>
                        <input className='form-control' name='email' type="email" value={formData.email} placeholder="Email" onChange={handleChange} disabled={loading} />
    
    
                        <label>Message</label>
                        <textarea className='form-control' name='msg' type="text" value={formData.msg} placeholder="Enter Your Message" onChange={handleChange} required={true} disabled={loading} />

                    <button className='btn btn-primary my-2' type="submit">
                        Submit
                    </button>
                </form>
                </div>
        )
}

export default ContactForm
