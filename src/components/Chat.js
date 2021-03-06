import React, { useEffect, useState } from 'react'
import '../assets/Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'

function Chat() {

    const { roomId } = useParams()
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue()

    useEffect( () => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot( snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages')
                .orderBy('timestamp', 'asc').onSnapshot( snapshot => (
                    setMessages(
                        snapshot.docs.map( 
                            doc => (doc.data())
                        )
                    )
                ))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages')
        .add({
            message : input,
            user : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
        console.log(`Your input is >> ${input}`)
    }

    return (
        <div className="app_chat">
            <div className="app_chat_header">
                <Avatar />
                <div className="app_chat_header_info">
                    <h3>{roomName}</h3>
                    <p>Last Seen { new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="app_chat_header_right">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="app_chat_body">
                {messages.map( message => (
                    <p className={`app_chat_message ${message.user === user.displayName && 'app_chat_receiver' }`}>
                        <span className="app_chat_name">
                            {message.user}
                        </span>
                        {message.message}
                        <span className="app_chat_time">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}        
            </div>
            <div className="app_chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)}></input>
                    <button type="submit" onClick={sendMessage}>send message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
