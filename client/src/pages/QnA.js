import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Link} from 'react-router-dom'

import QuestionCard from '../components/qna/QuestionCard'
import MetaTags from '../components/MetaTags'
import Loader from '../layout/Loader'

const QnA = () => {

    const [questions, setQuestions] = useState(null)
    const [commentVal, setCommentVal] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const res = await axios.get('https://healthplusplus.herokuapp.com/qna/')
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
            setLoading(true)
            const res = await axios.post('https://healthplusplus.herokuapp.com/qna/q', {
                password: localStorage.getItem('authKey'),
                content: commentVal
            })
            swal({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                button: 'OK'
            })
            setLoading(false)
        } catch (err) {
            setLoading(false)
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
            <MetaTags 
                title='Health++ - QnA Forum'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='qna page'
            />
            {localStorage.getItem('authKey') !== '' && localStorage.getItem('authKey') ? 
            <React.Fragment>
                    <h2 className='mt-3'><span className='color-green'>P</span>ost <span className='color-green'>Q</span>uestions</h2>
                    <div style={randomStyles} className='mt-4'>
                    <input className='form-control' type="text" name="comment" value={commentVal} onChange={(e) => setCommentVal(e.target.value)} disabled={loading} />
                        <button onClick={postData} className='btn btn-primary'>Post</button>
                    </div>
                    </React.Fragment>
            : <Link to='/signup'><button className='btn-primary'>Sign Up to post a question</button></Link>
        }
            <h2 className='mt-3'><span className='color-green'>L</span>atest <span className='color-green'>Q</span>uestions</h2>
            {questions ? questions.map((q, i) => {
                return <QuestionCard 
                            key={i}
                            id={q._id}
                            username={q.username}
                            profile={q.profile}
                            content={q.content}
                            postedAt={q.postedAt}
                        />
            }) : <Loader />}
        </div>
    )
}

export default QnA
