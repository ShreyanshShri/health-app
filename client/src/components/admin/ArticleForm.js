import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const ArticleForm = ({formData, addArticle, editArticle}) => {

    const [currFormData, setCurrFormData] = useState({
        title: formData.title,
        description: formData.description,
        wallpaper: formData.wallpaper,
        markdown: formData.markdown
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setCurrFormData(prevData => {
            return {...prevData, [event.target.name]: event.target.value}
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)
        if(addArticle !== undefined || addArticle != null) {
            await addArticle(currFormData)
            return setLoading(false)
        }
        await editArticle(currFormData)
        return setLoading(false)
    }

    return (
        <div>
            {loading && "Loading"}
            <Form onSubmit={handleSubmit} className='container' style={{marginTop: '20px'}}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name='title' type="text" placeholder="Title" onChange={handleChange} value={currFormData.title} required={true} disabled={loading} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' type="text" placeholder="Description" onChange={handleChange} value={currFormData.description} required={true} disabled={loading} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>WallPaper URL</Form.Label>
                    <Form.Control name='wallpaper' type="text" placeholder="Enter Wallpaper URL" onChange={handleChange} value={currFormData.wallpaper} required={true} disabled={loading} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Markdown</Form.Label>
                    <Form.Control as='textarea' name='markdown' type="text" placeholder="Enter your article" onChange={handleChange} value={currFormData.markdown} required={true} disabled={loading} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ArticleForm