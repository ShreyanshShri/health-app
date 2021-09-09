import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

import QuestionCard from '../components/qna/QuestionCard'

const QnA = () => {

    const [questions, setQuestions] = useState(null)
    const [commentVal, setCommentVal] = useState('')

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

    const postData = async () => {
        try {
            const res = await axios.post('/qna/q', {
                password: localStorage.getItem('authKey'),
                content: commentVal
            })
            swal({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                button: 'OK'
            })
        } catch (err) {
            console.log(err)
            swal({
                title: "Error !",
                text: `${err.response && err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })
        }
    }

    useEffect(function() {
        fetchData()
    }, [])


    const randomStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return (
        <div className='container'>
            {localStorage.getItem('authKey') !== '' && localStorage.getItem('authKey') ? 
            <React.Fragment>
                    <h2 className='mt-3'><span className='color-green'>P</span>ost <span className='color-green'>Q</span>uestions</h2>
                    <div style={randomStyles} className='mt-4'>
                    <input className='form-control' type="text" name="comment" value={commentVal} onChange={(e) => setCommentVal(e.target.value)} />
                        <button onClick={postData} className='btn btn-primary'>Post</button>
                    </div>
                    </React.Fragment>
            : <Link to='/signup'><button className='btn-primary'>Sign Up to post a question</button></Link>
        }
            <h2 className='mt-3'><span className='color-green'>L</span>atest <span className='color-green'>Q</span>uestions</h2>
            {questions && questions.map((q, i) => {
                return <QuestionCard 
                            key={i}
                            id={q._id}
                            username={q.username}
                            profile={q.profile}
                            content={q.content}
                            postedAt={q.postedAt}
                        />
            })}
        </div>
    )
}

export default QnA
