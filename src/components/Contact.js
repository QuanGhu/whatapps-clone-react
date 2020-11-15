import React from 'react'
import { Avatar } from '@material-ui/core'
import db from '../firebase'

function Contact({ id, name, addNewChat }) {

    const createChat = () => {
        const roomName = prompt("Please enter room name")

        if(roomName) {
            db.collection('rooms').add({
                name : roomName
            });
        }
    }

    return !addNewChat ? (
        <div className="app_sidebar_contact">
            <Avatar />
            <div className="app_sidebar_contact_info">
                <h3>{name}</h3>
                <p>Last Message</p>
            </div>
        </div>
    ) : (
        <div className="app_sidebar_contact" onClick={createChat}>
            <h3>Add New Chat</h3>
        </div>
    )
}

export default Contact
