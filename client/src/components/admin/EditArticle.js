import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

import ArticleForm from './ArticleForm'

const EditArticle = ({match}) => {

    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [redirect, setRedirect] = useState('')

    const fetchData = async() => {
        try {
            const res = await axios.get(`/articles/${match.params.id}`)
            const data = res.data
            setArticle(data)
            setLoading(false)
        } catch (err) {
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })        
            setLoading(false)
        }
    }

    const editArticle = async (formData) => {
        try {
            const res = await axios.put(`/articles/${match.params.id}`, {
                    password: sessionStorage.getItem('authToken'),
                    article: formData
            })
            swal({
                title: res.data.message,
                icon: "success",
                button: "OK",
            })
        
            setRedirect('success')
        } catch (err) {
            console.log(err.response.data)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
            })        
            if(err.response.status === 400) {
                return setRedirect('admin')
            }
            
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2 className='container'>Edit Article</h2>
            {loading ? "Loading" : <ArticleForm formData={article} editArticle={editArticle} />}
            {redirect === 'success' && <Redirect to={`/articles/${match.params.alug}/${match.params.id}`} />}
            {redirect === 'admin' && <Redirect to='/admin' />}
        </div>
    )
}

export default EditArticle