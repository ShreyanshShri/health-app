import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

import IDontKnowWhatToNameIt from './IDontKnowWhatToNameIt'

const Comments = () => {

    const [comments, setComments] = useState(null)

    const fetchData = async () => {
        try {
            
            const res = await axios.get(`/articles/comments/get/${localStorage.getItem('userID')}`)
            setComments(res.data.comments)
            console.log(res.data.comments)
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
            
            const res = await axios.put(`/articles/comments/${id}`, {
                comment: content,
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
            
            const res = await axios.delete(`/articles/comment/${id}`, {
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
                comments && comments.map((comm, i) => {
                    return <IDontKnowWhatToNameIt
                        key={i} 
                        content={comm.comment}
                        edit={onEdit}
                        del={onDelete}
                        id={comm._id}
                    />
                })
            }
        </div>
    )
}

export default Comments

