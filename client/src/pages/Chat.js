import React, { useState, useEffect, Fragment } from 'react'
import io from 'socket.io-client'
import {Link} from 'react-router-dom'
import ScrollToBottom from 'react-scroll-to-bottom'

let socket;

const Chat = ({match}) => {

    const [oldMsgs, setMsg] = useState([])
    const [newMsgs, addMsg] = useState([])
    const [msg, setMessage] = useState('')


    socket = io('http://localhost:5000',  {
        transports: ['websocket'], 
        upgrade: false
      })

    useEffect(() => {
        console.log('sent  join req')
            socket.emit('join-user', {
                sender_authKey: localStorage.getItem('authKey'),
                reciever_id: match.params.id
            })
        // eslint-disable-next-line
    }, [])

    socket.on('message', (msg) => {
        if(Array.isArray(msg)){
            setMsg(msg)
            console.log(msg)
    } else {
        addMsg(prevMessages => [...prevMessages, msg ])
        console.log(msg)
    }
    })

    const sendMessage = () => {
        const newMsg = {
            text: msg,
            sender: localStorage.getItem('username')
        }
        if (msg !== '') socket.emit('send-message', newMsg)
        setMessage('')
    }

    return (
        <div>
            <ScrollToBottom className='messages container mt-3 react-scroll-to-bottom'>
                {oldMsgs && oldMsgs.map((m, i) => {
                    return <div className='message container my-2'>
                            <p className='b'><span className='left purple-text'>{m.sender}</span><span className='right text-muted'>{m.time}</span></p><br />
                            <p style={{margin: '0'}}>{m.text}</p>
                        </div>
                })}
                {newMsgs && newMsgs.map((m, i) => {
                    return <div className='message container my-2'>
                                <p className='b'><span className='left purple-text'>{m.sender}</span><span className='right text-muted'>{m.time}</span></p>
                                <p className='m-7'>{m.text}</p>
                            </div>
                })}
            </ScrollToBottom>
            <div style={{display: "flex"}} className='container'>
            <input type='text' name='msg' placeholder='Enter Your Message...' className={`inp width-9 form-control`} onChange={(e) => setMessage(e.target.value)} value={msg} />
            <button onClick={sendMessage} className='btn btn-outline-primary ml-2 sendBtn' style={{outline:'none', padding:'5px'}}><i className='fa fa-paper-plane fa-2x' />Send</button>
            </div>
        </div>
    )
}

export default Chat
