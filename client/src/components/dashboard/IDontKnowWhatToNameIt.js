import React, {useState} from 'react'

const IDontKnowWhatToNameIt = ({content, edit, del, id}) => {

    const [inputVal, setInputVal] = useState(content)
    return (
        <div>
             <textarea rows={3} value={inputVal} onChange={(e) => setInputVal(e.target.value)}></textarea>
             <button className='btn btn-secondary-outline' onClick={() => edit(id, inputVal)}>Edit</button>
             <button className='btn btn-danger' onClick={() => del(id)}>Delete</button>
        </div> 
    )
}

export default IDontKnowWhatToNameIt
