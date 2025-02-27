import React from 'react'
import {Card, Typography} from "@mui/material";


interface CountdownProps {
    countdown: string;
}
const Countdown: React.FC<CountdownProps> = ({ countdown }) => {
    return (
        <Card sx={{padding: '10px'}}><Typography variant={'h3'}>{countdown}</Typography></Card>

    )
}

export default Countdown;