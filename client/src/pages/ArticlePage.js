import React, {useEffect, useState, Fragment} from 'react'
import axios from 'axios'
import MetaTags from '../components/MetaTags'
import swal from 'sweetalert'

// import Loader from '../common/Loader'
import Comments from '../components/articles/Comments'

const ArticlePage = ({ match }) => {
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchData = async() => {
        try {
            const res = await axios.get(`/articles/${match.params.id}`)
            const data = res.data
            console.log(data)
            setArticle(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            swal({
                title: "Error !",
                text: `${err.response.data.message}`,
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
        <article>
            {loading ? "Loading" : 
            <Fragment>
            <MetaTags 
                title={article.title}
                description={article.description}
                keywords='study, motivation, students, life, life lessons, xyz city'
                url='https://yoururl.com'
                imageurl={article.wallpaper}
                type='article page'
            />
            <div className='article-page'>
                <div className='wallpaper' style={{background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${article.wallpaper}')`}}>
                    <h2 className='container'>{article.title}</h2>
                    <span className='container'>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <p className='para container'  dangerouslySetInnerHTML={{ __html: article.content }}></p>
                <Comments comments={article.comments} />
            </div>
            </Fragment>}
        </article>
    )
}

export default ArticlePage