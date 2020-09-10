import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css'

const Message = forwardRef(({ massage, userName }, ref) => {

    const isUser = userName === massage.userName;

    return (
        <div ref={ref} className={`massage ${isUser && 'massage__user'}`}>
            <Card className={isUser ? 'massage__userCard' : 'massage__guestCard'}>
                <CardContent>
                    <Typography
                        color="white"
                        // className={`massage__text ${isUser && 'massage__userText'}`}
                        variant='h5'
                        component='h2'
                    >
                        {!isUser && `${massage.userName || "Unknown User"} : `} {massage.massage}
                    </Typography>
                </CardContent>
            </Card>

        </div>
    );
})

export default Message;
