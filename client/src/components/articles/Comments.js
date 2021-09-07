import React, {useState} from 'react'
import swal from 'sweetalert'
import {Button} from 'react-bootstrap'
import axios from 'axios'

const Comments = ({comments, id}) => {
    
    const [commentVal, setCommentVal] = useState('')

    const postData = async () => {
        try {
            
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


    return (
        <div className='comments'>
            <input type="text" name="comment" value={commentVal} onChange={(e) => setCommentVal(e.target.value)} />
            <Button onClick={postData}>Post</Button>
            <div className='comments-list'>
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


const CommentCard = ({comment}) => {
    return(
        <div>
            <p>{comment.comment}</p>
            <div className='d-flex' style={{alignItems: "center", justifyContent:'space-between'}}>
                <h6>{comment.username}</h6>
                <p>{comment.postedAt}</p>
            </div>
        </div>
    )
}

export default Comments
