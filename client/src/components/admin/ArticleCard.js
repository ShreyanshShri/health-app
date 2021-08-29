import React from 'react'
import {Link} from 'react-router-dom'


const ArticleCard = ({title, description, id, slug, deleteArticle, loading}) => {

    const deleteThisArticle = () => {
        deleteArticle(id)
    }

    return (
            <div className='content'>
                <h2>{title}</h2>
                <p>{description}</p>
                <Link to={`/articles/${slug}/${id}`}><button className='btn btn-primary mr-2 mt-2'>Read More</button></Link>
                <Link to={`admin/article/edit/${id}`}><button className='btn btn-outline-secondary mr-2 mt-2'>Edit</button></Link>
                <button onClick={deleteThisArticle} className='btn btn-outline-danger mt-2' disabled={loading}>Delete Article</button>
            </div>
            )
}

export default ArticleCard