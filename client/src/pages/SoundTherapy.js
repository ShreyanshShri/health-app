import React, {useEffect, useState} from 'react'

import meditation from '../assets/meditation.mp3'

const SoundTherapy = () => {

    const [play, setPlay] = useState(false)

    useEffect(function() {
        const audioElement = new Audio(meditation)
        if(play) audioElement.play()
    }, [play])

    return (
        <div>
            sound therapoy
            <button onClick={() => setPlay(true)}>play</button>
            {/* {play && audioElement.play()} */}
        </div>
    )
}

export default SoundTherapy
