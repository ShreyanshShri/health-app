import axios from 'axios'
import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'

import IDontKnowWhatToNameIt from './IDontKnowWhatToNameIt'
import Loader from '../../layout/Loader'

const Comments = () => {

    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
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

    const onDelete = async (id) => {
        try {
            setLoading(true)
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
    }, [])

    return (
        <div>
            {
                comments ? comments.map((comm, i) => {
                    return <IDontKnowWhatToNameIt
                        key={i} 
                        content={comm.comment}
                        edit={onEdit}
                        del={onDelete}
                        id={comm._id}
                        loading={loading}
                    />
                }): <Loader />
            }
        </div>
    )
}

export default Comments

