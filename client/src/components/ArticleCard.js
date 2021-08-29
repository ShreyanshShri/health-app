import React from 'react'
import {Link} from 'react-router-dom'

const ArticleCard = ({title, description, wallpaper, id, slug}) => {

    return (
        <div className='articleCard'>
            <img src={wallpaper} alt='an img' /><br />
            <div className='card-content'>
                <h2>{title}</h2>
                <p>{description}</p>
                <Link to={`/articles/${slug}/${id}`}><button className='btn btn-outline-primary mt-2'>Read More</button></Link>
            </div>
        </div>
    )
}

export default ArticleCard