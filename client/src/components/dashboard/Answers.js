import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

const Answers = () => {

    const [answers, setAnswers] = useState(null)

    const fetchData = async () => {
        try {
            
            const res = await axios.get(`/qna/a/all/${localStorage.getItem('userID')}`)
            setAnswers(res.data.answers)

        } catch (err) {
            console.log(err.response)
            swal({
                title: "Error !",
                text: `${err.response ? err.response.data.message : "An error occured!"}`,
                icon: "error",
                button: "Try Again",
              })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {
                answers && answers.map((ans, i) => {
                    return <div>
                        lolz
                    </div>
                })
            }
        </div>
    )
}

export default Answers
