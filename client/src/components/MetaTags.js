import React from 'react'
import {Helmet} from 'react-helmet'

const MetaTags = ({title, description, keywords, url, imageUrl, type}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content={type} />
            </Helmet>
        </div>
    )
}

export default MetaTags