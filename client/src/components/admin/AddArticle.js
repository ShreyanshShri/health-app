import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

import ArticleForm from './ArticleForm'

const AddArticle = () => {
    
    const [state, setState] = useState("Post Article")
    const [articleId, setArticleId] = useState(null)
    const [loading, setLoading] = useState(false)

    const postArticle = async (article) => {
        const formData = {
            password: sessionStorage.getItem('authToken'),
            article
        }

        try {
            setState('Posting Article... Please Wait')
            setLoading(true)
            const res = await axios.post('https://healthplusplus.herokuapp.com/articles', formData)
            setArticleId(res.data.id)
            setState(res.data.message)
            setLoading(false)
            swal({
                title: res.data.message,
                icon: "success",
                button: "OK",
              })
        
        } catch (err) {
            setLoading(false)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })        
            setState('An error Occured')
        }
    }

    return (
        <div>
            <h2 className='container'>{state}</h2>
            <ArticleForm 
                addArticle={postArticle}
                formData={{
                    title: '',
                    description: '',
                    wallpaper: '',
                    markdown: '',
                }}
                loading={loading}
                postArticle={postArticle}
            />
            {state === "Article Uploaded" && <Redirect to={`/articles/slug/${articleId}`} />}
        </div>
    )
}

export default AddArticle