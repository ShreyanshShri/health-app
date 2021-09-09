import React, {useState} from 'react'
import swal from 'sweetalert'
import {Button} from 'react-bootstrap'
import axios from 'axios'

const Comments = ({comments, id}) => {
    
    const [commentVal, setCommentVal] = useState('')

    const postData = async () => {
        try {

            if(commentVal === '') return
            
            const res = await axios.post(`/articles/comment/${id}`, {
                comment: commentVal,
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

    const randomStyles = {
        display: 'flex',
        justifyContent: 'space-between'
    }

    return (
        <div className='comments container'>
            <hr />
            <h2><span className="color-green">C</span>omments</h2>
            <div style={randomStyles}>
            <input required type="text" name="comment" className='form-control d-inline mr-2' value={commentVal} onChange={(e) => setCommentVal(e.target.value)}  style={{width: "90%"}} />
            <button className='btn btn-primary ml-2 d-inline-block' onClick={postData}>Post</button>
            </div>
            <div className='comments-list'  style={{marginTop: "20px"}}>
                {comments !== [] && comments && comments.map((comm, index) => {
                    return <CommentCard 
                                key={index}
                                comment={comm}
                            />
                })}
            </div>
        </div>
    )
}

const commentStyles = {
    padding: "10px",
    borderTop: "1px solid rgba(0,0,0, 0.2)",
    borderBottom: "1px solid rgba(0,0,0, 0.2)"
}

const CommentCard = ({comment}) => {
    return(
        <div style={commentStyles}>
            <p  style={{margin: '0'}}>{comment.comment}</p>
            <div className='d-flex' style={{alignItems: "center", justifyContent:'space-between'}}>
                <h6>{comment.username}</h6>
                <p style={{margin: '0'}}>{comment.postedAt}</p>
            </div>
        </div>
    )
}

export default Comments
