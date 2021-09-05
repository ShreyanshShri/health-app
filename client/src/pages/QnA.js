import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

import QuestionCard from '../components/qna/QuestionCard'

const QnA = () => {

    const [questions, setQuestions] = useState(null)

    const fetchData = async () => {
        try {
            const res = await axios.get('/qna/')
            setQuestions(res.data.qnaS)
        } catch (err) {
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })
        }
    }

    useEffect(function() {
        fetchData()
    }, [])

    return (
        <div>
            {questions && questions.map((q, i) => {
                return <QuestionCard 
                            key={i}
                            id={q._id}
                            username={q.username}
                            profile={q.profile}
                            content={q.content}
                        />
            })}
        </div>
    )
}

export default QnA
