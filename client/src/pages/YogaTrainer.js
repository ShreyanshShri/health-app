import React, {useState, useEffect} from 'react'
import MetaTags from '../components/MetaTags'

import pos1 from '../assets/yoga/pos1.jpg'
import pos2 from '../assets/yoga/pos2.jpg'
import pos3 from '../assets/yoga/pos3.jpg'
import pos4 from '../assets/yoga/pos4.jpg'
import pos5 from '../assets/yoga/pos5.jpg'
import pos6 from '../assets/yoga/pos6.jpg'
import pos7 from '../assets/yoga/pos7.jpg'
import pos8 from '../assets/yoga/pos8.jpg'
import pos9 from '../assets/yoga/pos9.jpg'
import pos10 from '../assets/yoga/pos10.jpg'

const YogaTrainer = () => {

    const [index, setIndex] = useState(0)
    const [completed, setCompleted] = useState('false')

    const imgs = [
        {
            img: pos1,
            name: 'Sarvangasana'
        },
        {
            img: pos2,
            name: 'Purvottanasana'
        },
        {
            img: pos3,
            name: 'Bhujangasana'
        },
        {
            img: pos4,
            name: 'Gharba Pindasana'
        },
        {
            img: pos5,
            name: 'Virbhadrasana'
        },
        {
            img: pos6,
            name: 'Ustrasana'
        },
        {
            img: pos7,
            name: 'Virabhadrasana'
        },
        {
            img: pos8,
            name: 'Vrksasana'
        },
        {
            img: pos9,
            name: 'Bakasan'
        },
        {
            img: pos10,
            name: 'Trikonasana'
        }
    ]

    useEffect(() => {
        setInterval(function() {
            if(index < imgs.length - 1){
                setIndex(index+1)
            } else {
                setCompleted(true)
            }
        }, 1000 * 60)
        //eslint-disable-next-line
    }, [])

    return (
        <div style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center'}}>
            <MetaTags 
                title='Health++ - Yoga Trainer'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='blog page'
            />
            <img src={imgs[index].img} alt='yoga-pose' style={{width: '75%', maxHeight:'80vh'}} />
            <h4>{imgs[index].name}</h4>
            <Timer />
        </div>
    )
}


const Timer = () => {
    const [t, setTime] = useState(60)

    useEffect(() =>{
        const interval = setInterval(() =>{
            setTime(prevT => prevT-1)
            if(t === 0) {
                setTime(60)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line
    }, [])


    return(
        <div>
            <h2 className='text-green'>{t}</h2>
        </div>
    )
}

export default YogaTrainer
