import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import {Button} from 'react-bootstrap'

const Comments = ({comments}) => {

    const postData = async () => {
        try {
            console.log("pressed")
        } catch (err) {
            console.log(err.response)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })
        }
    }

    const [commentVal, setCommentVal] = useState('')

    return (
        <div className='comments'>
            <input type="text" name="comment" value={commentVal} onChange={(e) => setCommentVal(e.target.value)} />
            <Button onClick={postData}>Post</Button>
            <div className='comments-list'>
                {comments.map((comm, index) => {
                    return <CommentCard 
                                key={index}
                                comment={comm}
                            />
                })}
            </div>
        </div>
    )
}


const CommentCard = ({comm}) => {
    return(
        <div>
            <p>{comm.comment}</p>
            <div className='d-flex' style={{alignItems: "center", justifyContent:'space-between'}}>
                <h6>{comm.username}</h6>
                <p>{comm.postedAt}</p>
            </div>
        </div>
    )
}

export default Comments
