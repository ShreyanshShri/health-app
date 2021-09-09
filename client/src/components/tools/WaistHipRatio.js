import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const WaistHipRatio = () => {

    const [waist, setWaist] = useState(0)
    const [hip, setHip] = useState(0)
    const [ratio, setRatio] = useState(null)

    const calculateRatio = () => {
        setRatio(Math.floor((parseFloat(waist) / parseFloat(hip)) * 10 ) / 10 )
    }

    return (
        <div className='container'>
            <Form.Label>Waist (from navel)</Form.Label>
            <Form.Control type='number' name='waist' value={waist} onChange={(e) => setWaist(e.target.value)} />
            <Form.Label>Hip (from buttock) </Form.Label>
            <Form.Control type='number' name='hip' value={hip} onChange={(e) => setHip(e.target.value)} />

            <Button onClick={calculateRatio}>
                Check Ratio
            </Button>
            <h4>Your Ratio: <h2>{ratio && ratio}</h2></h4>
            <p>Ideally the waist hip ratio should be below 0.85 in women and 0.9 in men.</p>
        </div>
    )
}

export default WaistHipRatio
