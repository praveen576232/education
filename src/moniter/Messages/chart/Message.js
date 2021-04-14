import './Message.css';
import React, { forwardRef } from 'react'
import { Avatar } from '@material-ui/core';
// import db from "../../../database/firebase";
import { useStateValue } from '../../../statemangement/statemangement';


const Messages = forwardRef( ({context},ref) => {
    const [{ user }, dispatch] = useStateValue();
    return (
        <div ref={ref} className={`messages ${user?.uid === context?.uid} && mymessage`}>
            <Avatar  src={context?.photourl} className="messages_avatar" ></Avatar>
    <p>{context?.msg}</p>
    <small>{new Date(context?.time?.toDate()).toLocaleString()}</small>
        </div>
    )
})

export default Messages