import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
const BmiCalculator = () => {

    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [bmi, setBmi] = useState(null)
    const [result, setResult] = useState('')

    const calculateBmi = () => {
        const newHeight = parseInt(height) / 100
        let bmi = parseInt(weight) / (newHeight * newHeight)
        bmi = Math.floor(bmi * 10) / 10
        setBmi(bmi)
        if(bmi <= 18.5) {
            setResult("UnderWeight")
        } else if(bmi > 18.5 && bmi <= 24.9) {
            setResult("Normal")
        } else if(bmi > 24.9 && bmi <= 29.9) {
            setResult("OverWeight")
        } else {
            setResult("Obesity")
        }
    }

    return (
        <div className='container'>
            <Form.Label>Weight (in kg)</Form.Label>
            <Form.Control type='number' name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Form.Label>Height (in cm)</Form.Label>
            <Form.Control type='number' name='height' value={height} onChange={(e) => setHeight(e.target.value)} />

            <Button onClick={calculateBmi}>
                Calculate BMI
            </Button>

            <h2>{bmi && `Your BMI: ${bmi}`}</h2>
            <h4>{result}</h4>
        </div>
    )
}

export default BmiCalculator
