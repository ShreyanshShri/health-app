import React, {useState} from 'react'
import { Form, Button, ToggleButton, ButtonGroup } from 'react-bootstrap'

const CalorieCalculator = () => {

    const [bodyStats, setBodyStats] = useState({
        mass: 0,
        height: 0,
        age: 0,
        gender: "1"
    })

    const [calories, setCalories] = useState(null)

    const handleChange = (event) => {
        setBodyStats(prevData => {
            return {...prevData, [event.target.name]: event.target.value}
        })
    }

    const calculateCalories = () => {
        if(bodyStats.gender === "1") {
            let calories = (13.397 * bodyStats.weight) + (4.799 * bodyStats.height) - (5.677 * bodyStats.age) + 88.362
            setCalories(calories)
        } else {
            let calories = (9.247 * bodyStats.weight) + (3.098 * bodyStats.height) - (4.330 * bodyStats.age) + 447.593
            setCalories(calories)
        }
    }

    return (
        <div className='container'>
            <Form.Label>Weight (in kg)</Form.Label>
            <Form.Control type='number' name='weight' value={bodyStats.weight} onChange={handleChange} />
            <Form.Label>Height (in cm)</Form.Label>
            <Form.Control type='number' name='height' value={bodyStats.height} onChange={handleChange} />
            <Form.Label>Age</Form.Label>
            <Form.Control type='number' name='age' value={bodyStats.age} onChange={handleChange} />
            <Form.Label>Gender</Form.Label>
            <ButtonGroup toggle>
                <ToggleButton
                    type="radio"
                    name="gender"
                    value={1}
                    checked={bodyStats.gender === "1"}
                    onChange={handleChange}
                >
                    Male
                </ToggleButton>

                <ToggleButton
                    type="radio"
                    name="gender"
                    value={2}
                    checked={bodyStats.gender === "2"}
                    onChange={handleChange}
                >
                    Female
                </ToggleButton>
            </ButtonGroup>
            <Button onClick={calculateCalories}>
                Calculate Calories
            </Button>
            {calories && <h4>Calories Needed per day: <h2>{Math.floor(calories * 10) / 10}</h2></h4>}
        </div>
    )
}

export default CalorieCalculator
