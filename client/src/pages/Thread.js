import axios from 'axios'
import React, {useEffect, useState} from 'react'
import swal from 'sweetalert'

import AnswerCard from '../components/qna/AnswerCard'
import MetaTags from '../components/MetaTags'
import Loader from '../layout/Loader'

const Thread = ({match}) => {

    const [question, setQuestion] = useState(null)
    const [commentVal, setCommentVal] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchData = async function(){
        try {
            const res = await axios.get(`https://healthplusplus.herokuapp.com/qna/${match.params.id}`)
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
            setLoading(true)
            const res = await axios.post(`https://healthplusplus.herokuapp.com/qna/a/${question._id}`, {
                answer: commentVal,
                password: localStorage.getItem("authKey")
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
        // eslint-disable-next-line
    }, [])

    const randomStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
    }

    return (
        <div className='container'>
            {question ?
            <React.Fragment>
                <MetaTags 
                    title={question.content}
                    description={question.content}
                    keywords='study, motivation, students, life, life lessons, xyz city'
                    url='https://yoururl.com'
                    imageurl='source.unsplash.com/random'
                    type='article page'
                />
            <div className='question mt-3'>
            <h3>{question.content}</h3>
            <div className='q-user-info'>
                <div className='d-flex align-items-center'><img src={`https://healthplusplus.herokuapp.com/uploads/${question.profile}`} className='user-avatar' alt='frick im in hurry no time ti write alt' /><p style={{margin: '0'}}>{question.username}</p></div>
                <span>{new Date(question.postedAt).toLocaleDateString()}</span>
            </div>
        </div>
        <div className='answers mt-2'>
            <hr />
            <h2><span className='color-green'>A</span>nswers</h2>
            <div style={randomStyles}>
        <input className='form-control' type="text" name="comment" value={commentVal} onChange={(e) => setCommentVal(e.target.value)} disabled={loading} />
            <button onClick={postData} className='btn btn-primary'>Post</button>
            </div>
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
        
        </React.Fragment> : <Loader />}
        </div>
    )
}

export default Thread
