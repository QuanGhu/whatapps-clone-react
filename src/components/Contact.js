import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import db from '../firebase'
import { Link } from "react-router-dom"

function Contact({ id, name, addNewChat }) {

    const [messages, setMessages] = useState("")

    const createChat = () => {
        const roomName = prompt("Please enter room name")

        if(roomName) {
            db.collection('rooms').add({
                name : roomName
            });
        }
    }

    useEffect(() => {
        console.log(id)
        if(id) {
            db.collection('rooms').doc(id).collection('messages').orderBy("timestamp","desc")
            .onSnapshot( snapshot => (
                setMessages(
                    snapshot.docs.map( 
                        doc => (doc.data())
                    )
                )
            ))
        }
    }, [id])

    return !addNewChat ? (
        <Link to={`/room/${id}`}>
            <div className="app_sidebar_contact">
                <Avatar />
                <div className="app_sidebar_contact_info">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="app_sidebar_contact" onClick={createChat}>
            <h3>Add New Chat</h3>
        </div>
    )
}

export default Contact
