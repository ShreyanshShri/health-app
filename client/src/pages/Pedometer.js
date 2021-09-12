import React, {useEffect, useState} from 'react'
import Shake from 'shake.js'
import axios from 'axios'
import swal from 'sweetalert'

import Loader from '../layout/Loader'

const Pedometer = () => {

    const [shakeCount, setShakeCount] = useState(null)

    const getData = async () => {
        
        try {
            const res = await axios.post('https://healthplusplus.herokuapp.com/stats/get', {
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

    const postData = async (count) => {
        
        try {
            await axios.post('https://healthplusplus.herokuapp.com/stats/add', {
                password: localStorage.getItem('authKey'),
                count: count
            })
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

        const myShakeEvent = new Shake({
            threshold:4, // optional shake strength threshold
            timeout: 50 // optional, determines the frequency of event generation
        })

        myShakeEvent.start()

        window.addEventListener('shake', shakeEventDidOccur, false);
        function shakeEventDidOccur () {

            //put your own code here etc.
            setShakeCount(shakeCount + 1)
            if (shakeCount % 20 === 0) {
                postData(shakeCount)
            }
        }

        return () => {
            myShakeEvent.stop()
            window.removeEventListener('shake', shakeEventDidOccur, false)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{    display: "flex",
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '20px'}}>
                <h3>Footstep count:</h3>
            <h2 className='color-green'>{shakeCount !== null ? shakeCount : <Loader />}</h2>

        </div>
    )
}

export default Pedometer
