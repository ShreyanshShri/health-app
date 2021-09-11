import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Jokes from './Jokes'

import yogaImg from '../../assets/man-yoga.png'
import soundIllus from '../../assets/sound.png'

const Stats = () => {

    const [shakeCount, setShakeCount] = useState(null)

    const getData = async () => {
        
        try {
            if(localStorage.getItem('isConsultant') == 'true'){
                setShakeCount(false)
                return
            }
            const res = await axios.post('/stats/get', {
                password: localStorage.getItem('authKey')
            })

            setShakeCount(res.data.count)
        } catch (err) {
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
    })

    return (
        <div className='container'>
            {shakeCount !== null &&
                <div>
                    <h4 className='mt-3'>A joke to make your day:</h4>
                    <Jokes />
                    <div className='footstep-stats' className='a-box mt-4'>
                        {shakeCount !== false && 
                        <React.Fragment>
                        <h3>Your stats</h3>
                        <h4>Footsteps Count: <span className='color-green'>{shakeCount}</span></h4>
                        <h4>Calories burned: <span className='color-green'>{(shakeCount / 1000) * 300}</span></h4>
                        </React.Fragment>
                        }
                    </div>
                    <div className='yoga-card d-flex align-items-center' style={{justifyContent: 'space-between'}}>
                        <img src={yogaImg} alt='yoga-img' style={{width: "60%"}} />
                        <Link to='/yoga' className='mr-2'><button className='btn btn-outline-primary'>Do yoga</button></Link>
                    </div>
                    <div className='yoga-card d-flex align-items-center' style={{justifyContent: 'space-between'}}>
                        <Link to='/sound-therapy' className='mr-2'><button className='btn btn-outline-primary'>Take a sound therapy</button></Link>
                        <img src={soundIllus} alt='yoga-img' style={{width: "60%"}} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Stats
