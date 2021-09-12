import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import axios from 'axios'

const EditProfile = () => {

    const [inputVal, setInputVal] = useState(null)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        

        try {
            let res;
            setLoading(true)
            if (localStorage.getItem('isConsultant') === 'true') {
                res = await axios.get(`https://healthplusplus.herokuapp.com/consultant/get/${localStorage.getItem("userID")}`)
                setInputVal(res.data.user.about)
            } else {
                res = await axios.get(`https://healthplusplus.herokuapp.com/user/get/${localStorage.getItem("userID")}`)
                setInputVal(res.data.user.about)
            }
            setLoading(false)
        } catch (err) {
            console.log(err.response)
            setLoading(false)
            swal({
                title: 'Error',
                text: err.response && err.response.data.message,
                icon: 'error',
                button: 'OK'
            })
        }
    }

    const edit = async () => {
        try {
            let res;
            setLoading(true)
            if (localStorage.getItem('isConsultant') === 'true') {
                res = await axios.post(`https://healthplusplus.herokuapp.com/consultant/update-desc`, {
                    password: localStorage.getItem('authKey'),
                    desc: inputVal
                })
            } else {
                res = await axios.post(`https://healthplusplus.herokuapp.com/user/update-desc`, {
                    password: localStorage.getItem('authKey'),
                    desc: inputVal
                })
            }
            setLoading(false)
            swal({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                button: 'ok'
            })
        } catch (err) {
            console.log(err.response)
            setLoading(false)
            swal({
                title: 'Error',
                text: err.response && err.response.data.message,
                icon: 'error',
                button: 'OK'
            })
        }
    }
    
    const updatePfP = async () => {
        if(file === null) return;
        try {
            setLoading(true)
            let formdata = new FormData()
            formdata.append('avatar', file)
            formdata.append('password', localStorage.getItem('authKey'))
            let res;
            if(localStorage.getItem('isConsultant') === 'true') {
                res = await axios.post('https://healthplusplus.herokuapp.com/consultant/change-pfp', formdata, {
                    headers: {
                        'content-type': 'multipart/form-data'
                      }
                })
            } else {
                res = await axios.post('https://healthplusplus.herokuapp.com/user/change-pfp', formdata, {
                    headers: {
                        'content-type': 'multipart/form-data'
                      }
                })
            }
            setLoading(false)
            swal({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                button: 'ok'
            })
        } catch (err) {
            setLoading(false)
            console.log(err.response)
            swal({
                title: 'Error',
                text: err.response && err.response.data.message,
                icon: 'error',
                button: 'OK'
            })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='container' style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
            <br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className='form-control' />
            <button className='btn btn-outline-primary' onClick={updatePfP}>Change profile pic</button>
            <br /><br />
            <textarea className='form-control' rows={3} value={inputVal} onChange={(e) => setInputVal(e.target.value)} disabled={loading}></textarea>
             <button className='btn btn-outline-secondary' onClick={() => edit()}>Edit</button>
             <br />
        </div>
    )
}

export default EditProfile