import React, { useEffect, useState } from 'react'
import '../assets/Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'
import db from '../firebase'

function Chat() {

    const { roomId } = useParams()
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")

    useEffect( () => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot( snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(`Your input is >> ${input}`)
    }

    return (
        <div className="app_chat">
            <div className="app_chat_header">
                <Avatar />
                <div className="app_chat_header_info">
                    <h3>{roomName}</h3>
                    <p>Last Seen</p>
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
                <p className="app_chat_message">
                    <span className="app_chat_name">
                        Chat Name
                    </span>
                    Hi Guys!
                    <span className="app_chat_time">
                        12:21 pm
                    </span>
                </p>

                <p className={`app_chat_message ${true && 'app_chat_receiver' }`}>
                    <span className="app_chat_name">
                        Chat Name
                    </span>
                    Hi Guys!
                    <span className="app_chat_time">
                        12:21 pm
                    </span>
                </p>
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
