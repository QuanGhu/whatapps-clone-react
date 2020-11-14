import React from 'react'
import '../assets/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import Contact from './Contact'

function Sidebar() {
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
                <Contact />
                <Contact />
            </div>
        </div>
    );
}

export default Sidebar;