import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'


const AdminLogin = ({redirect, setRedirect}) => {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    }

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post('https://healthplusplus.herokuapp.com/auth', {password})
            sessionStorage.setItem('authToken', res.data.authToken)
            setLoading(false)
            setRedirect(true)
        } catch (err) {
            setLoading(false)
            console.log(err.response.data)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })        
        }
    }
    return (
        <Form onSubmit={handleSubmit} className='container' style={style}>
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                    name='password' 
                    type="text" 
                    placeholder="Enter Admin password" 
                    onChange={(event) => setPassword(event.target.value)} 
                    value={password}
                    required={true}
                    disabled={loading}
                />

            <Button className='ml-3' variant="primary" type="submit" disabled={loading}>
                Submit
            </Button>
        </Form>
    )
}

export default AdminLogin