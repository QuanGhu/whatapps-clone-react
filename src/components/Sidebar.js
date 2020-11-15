import React, { useState, useEffect } from 'react'
import '../assets/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import Contact from './Contact'
import db from '../firebase'

function Sidebar() {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => setRooms(
            snapshot.docs.map( (doc) => ({
                    id : doc.id,
                    data : doc.data()
                })
            )
        ));
    }, [])
    return (
        <div className="app_sidebar">
            <div className="app_sidebar_header">
                <Avatar />
                <div className="app_sidebar_header_right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="app_sidebar_search">
                <div className="app_sidebar_search_container">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search chat"/>
                </div>
            </div>
            <div className="app_sidebar_contacts">
                <Contact addNewChat/>
                {rooms.map( room => (
                    <Contact key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;