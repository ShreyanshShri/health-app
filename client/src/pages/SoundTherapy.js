import React, {useEffect, useState, useRef} from 'react'

import meditation from '../assets/meditation.mp3'
import MetaTags from '../components/MetaTags'

const SoundTherapy = () => {

    const [play, setPlay] = useState(false)
    
    const canvasRef = useRef(null)
    useEffect(function() {
        const audioElement = new Audio(meditation)
        if(play) audioElement.play()

        
        // https://www.youtube.com/watch?v=VNmTubIDZOY
        // check out this awesome tutorial to know more about sine waves
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const wave = {
            y: canvas.height / 2,
            length: 0.01,
            amplitude: 150,
            frequency: 0.01
          }
          
          const strokeColor = {
            h: 200,
            s: 50,
            l: 50
          }
          
          const backgroundColor = {
            r: 0,
            g: 0,
            b: 0,
            a: 0.01
          }
          
          let increment = wave.frequency
          function animate() {
            requestAnimationFrame(animate)
            c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${
              backgroundColor.b
            }, ${backgroundColor.a})`
            c.fillRect(0, 0, canvas.width, canvas.height)
          
            c.beginPath()
            c.moveTo(0, canvas.height / 2)
          
            for (let i = 0; i < canvas.width; i++) {
              c.lineTo(
                i,
                wave.y +
                  Math.sin(i * wave.length + increment) *
                    wave.amplitude *
                    Math.sin(increment)
              )
            }
          
            c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.cos(increment))}, ${
              strokeColor.s
            }%, ${strokeColor.l}%)`
            c.stroke()

            c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${
            backgroundColor.b
            }, ${backgroundColor.a})`
            c.fillRect(0, 0, canvas.width, canvas.height)
        
            c.beginPath()
            c.moveTo(0, canvas.height / 2)
        
            for (let i = -200; i < canvas.width; i++) {
            c.lineTo(
                i + 200,
                wave.y +
                Math.sin(i * wave.length + increment) *
                    wave.amplitude *
                    Math.sin(increment)
            )
            }
        
            c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${
            strokeColor.s
            }%, ${strokeColor.l}%)`
            c.stroke()

                  increment += wave.frequency
          }
          
          animate()
    }, [play])

    return (
        <div>
          <MetaTags 
                title='Health++ - Sound Therapy'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='login page'
            />
            <button onClick={() => setPlay(true)} className='btn btn-success' style={{display: play && 'none', position: 'absolute'}}>Play</button>
            <canvas
                ref={canvasRef}
                id="myCanvas"
            >
        Your browser does not support the HTML canvas tag.
      </canvas>
        </div>
    )
}

export default SoundTherapy
