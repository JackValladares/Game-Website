import React from 'react'
import {Box, Card, Typography, useTheme} from "@mui/material";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";


interface NetworkStatusProps {
    serverIsAlive: boolean;
    message: string;
}
const NetworkStatus: React.FC<NetworkStatusProps> = ({ serverIsAlive, message }) => {
    const theme = useTheme();

    return (<Box display={'flex'} gap={2} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h4'} color={theme.palette.text.primary}>{message}</Typography>
            {serverIsAlive ? <SignalCellular4BarIcon color={'success'} fontSize={'large'}/> : <SignalCellular4BarIcon color={'error'} fontSize={'large'}/>}
        </Box>
    )
}

export default NetworkStatus;