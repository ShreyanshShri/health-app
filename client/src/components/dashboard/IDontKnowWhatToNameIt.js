import React, {useState} from 'react'

const IDontKnowWhatToNameIt = ({content, edit, del, id, loading}) => {

    const [inputVal, setInputVal] = useState(content)
    return (
        <div className='container mt-2'>
             <textarea className='form-control' rows={3} value={inputVal} onChange={(e) => setInputVal(e.target.value)} disabled={loading}></textarea>
             <button className='btn btn-outline-secondary' onClick={() => edit(id, inputVal)}>Edit</button>
             <button className='btn btn-danger ml-2' onClick={() => del(id)}>Delete</button>
        </div> 
    )
}

export default IDontKnowWhatToNameIt
