import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'

import ArticleCard from './ArticleCard'

const AllArticles = () => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await axios.get(`/articles?page=${1}`)
            const data = res.data.article
            setArticles(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "OK",
              })
        
        }
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line
    }, [])

    const deleteArticle = async(id) => {
        const postData = {
            data: {
                password: sessionStorage.getItem('authToken')
            }
        }
        try {
            const res = await axios.delete(`/articles/${id}`, postData)
            swal({
                title: "Success!",
                text: `${res.data.message}`,
                icon: "success",
                button: 'OK',
              })
        
            fetchData()
        } catch (err) {
            console.log(err.response.data)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
                icon: "error",
                button: "Try Again",
              })
        
        }
    }

    return (
        <div className='container'>
            <Link to='/admin/article/new'><button className='btn btn-outline-secondary container my-2'>Add Article</button></Link>
            {loading ? "Loading" : articles.map((article, index) => {
                return <ArticleCard 
                            key={index}
                            wallpaper={article.wallpaper} 
                            title={article.title} 
                            description={article.description}
                            id={article._id}
                            slug={article.slug}
                            deleteArticle={deleteArticle}
                            loading={loading}
                        />
            })}
        </div>
    )
}

export default AllArticles