import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import './style.css'
import ArticleCard from '../components/ArticleCard'
import MetaTags from '../components/MetaTags'
import Loader from '../layout/Loader'

const ArticleList = () => {
    
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const res = await axios.get(`/articles?page=${1}`)
            const data = res.data.articles
            console.log(res)
            setArticles(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
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

    return (
        <div className='container'>
            <MetaTags 
                title='Health++ - Blog'
                description='A complete solution to all your health problems'
                keywords='motivation, health, fitness, yoga, bmi'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='blog page'
            />
            <h1 className='container'>Articles</h1>
            {loading ? <Loader /> : articles.map((article, index) => {
                return <ArticleCard 
                            key={index}
                            wallpaper={article.wallpaper} 
                            title={article.title} 
                            description={article.description}
                            slug={article.slug}
                            id={article._id}
                        />
            })}
        </div>
    )
}

export default ArticleList