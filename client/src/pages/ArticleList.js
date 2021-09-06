import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import './style.css'
import ArticleCard from '../components/ArticleCard'
import MetaTags from '../components/MetaTags'
// import Loader from '../common/Loader'

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
                title='xyz Coaching- Blog'
                description='a coaching institute based on this city for preparation of this that'
                keywords='study, motivation, students, life, life lessons, xyz city'
                url='https://yoururl.com'
                imageurl='source.unsplash.com/random'
                type='register page'
            />
            <h1 className='container'>Articles</h1>
            {!loading && articles.map((article, index) => {
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