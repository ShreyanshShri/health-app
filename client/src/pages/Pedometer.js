import React, {useEffect} from 'react'
import Shake from 'shake.js'

const Pedometer = () => {

    useEffect(() => {
        
        const myShakeEvent = new Shake({
            threshold:4, // optional shake strength threshold
            timeout: 200 // optional, determines the frequency of event generation
        })

        myShakeEvent.start()

        window.addEventListener('shake', shakeEventDidOccur, false);
        function shakeEventDidOccur () {

            //put your own code here etc.
            console.log('brrr')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            shake
        </div>
    )
}

export default Pedometer
