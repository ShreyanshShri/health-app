import axios from 'axios'
import React, {useEffect, useState} from 'react'
import swal from 'sweetalert'

import AnswerCard from '../components/qna/AnswerCard'

const Thread = ({match}) => {

    const [question, setQuestion] = useState(null)
    const [commentVal, setCommentVal] = useState('')

    const fetchData = async function(){
        try {
            const res = await axios.get(`/qna/${match.params.id}`)
            setQuestion(res.data.qna)
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

    const postData = async () => {
        try {

            const res = await axios.post(`/qna/a/${question._id}`, {
                answer: commentVal,
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

    useEffect(() => {
        fetchData()
    }, [])

    const randomStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return (
        <div className='container'>
            {question && 
            <React.Fragment>
            <div className='question mt-3'>
            <h3>{question.content}</h3>
            <div className='q-user-info'>
                <div className='d-flex align-items-center'><img src={`/uploads/${question.profile}`} /><p style={{margin: '0'}}>{question.username}</p></div>
                <span>{new Date(question.postedAt).toLocaleDateString()}</span>
            </div>
        </div>
        <div style={randomStyles}>
        <input className='form-control' type="text" name="comment" value={commentVal} onChange={(e) => setCommentVal(e.target.value)} />
            <button onClick={postData} className='btn btn-primary'>Post</button>
            </div>
        <div className='answers mt-2'>
            <hr />
            <h2><span className='color-green'>A</span>nswers</h2>
            {question.answers.map((ans, id) => {
                return <AnswerCard 
                    username={ans.username}
                    profile={ans.profile}
                    email={ans.email}
                    answer={ans.answer}
                    postedAt={ans.createdAt}
                />
            })}
        </div>
        
        </React.Fragment>}
        </div>
    )
}

export default Thread
