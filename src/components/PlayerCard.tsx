import React from 'react';
import {Box, Card, Typography, useTheme} from '@mui/material';
import { Player} from "../App";
import Button from './Button';

interface PlayerCardProps {
    player: Player;
    updateScoreFunction: (pkey: number, delta: number) => void;
}
const PlayerCard: React.FC<PlayerCardProps> =
    ({ player, updateScoreFunction}) => {
    const theme = useTheme();
    const incrementScore = () => {
        updateScoreFunction(player.pkey, 1);
    }

    const decrementScore = () => {
        updateScoreFunction(player.pkey, -1);
    }

    //console.log(`Delta for ${player?.user_name}: `, player?.delta);

    const nameNoSpace = player?.user_name.replace(/\s/g, '');


    return (
        <Card sx={{ display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            border: '1px solid black',
            padding: '10px',
            margin: '10px',
            borderRadius: '5px',
            height: '400px',
            width: '400px'}}>
            <img src={`${nameNoSpace}.jpg`} alt={player?.user_name} style={{width: '200px'}} />
            <Typography variant={'h3'}>{player?.user_name}</Typography>
            <Box sx={{display: 'flex', width:' 100%', justifyContent: 'space-evenly'}}>
                <Button onClick={() => decrementScore()}>-</Button>
                <Button onClick={() => incrementScore()}>+</Button>
            </Box>

            <Typography variant="h3">
                {player.user_score}
            </Typography>
            <Typography variant="h5" color={player.delta >= 0 ? theme.palette.success.main : theme.palette.error.main} sx={{opacity: '0.5'}}>
                {player.delta}
            </Typography>

        </Card>

    );

}

export default PlayerCard;