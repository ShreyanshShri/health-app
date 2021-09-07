import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

import IDontKnowWhatToNameIt from './IDontKnowWhatToNameIt'

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

    const onEdit = async(id, content) => {
        try {
            
            const res = await axios.put(`/qna/a/${id}`, {
                answer: content,
                password: localStorage.getItem("authKey")
            })
            
            swal({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                button: 'OK'
            })

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

    const onDelete = async (id) => {
        try {
            
            const res = await axios.delete(`/qna/a/${id}`, {
                data: {
                    password: localStorage.getItem("authKey")
                }
            })
            swal({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                button: 'OK'
            })

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
                    return <IDontKnowWhatToNameIt 
                        content={ans.answer}
                        edit={onEdit}
                        del={onDelete}
                        id={ans._id}
                    />
                })
            }
        </div>
    )
}

export default Answers
