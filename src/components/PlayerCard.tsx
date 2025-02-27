import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import { Player} from "../App";

interface PlayerCardProps {
    player: Player;
    updateScoreFunction: (pkey: number, delta: number) => void;
}
const PlayerCard: React.FC<PlayerCardProps> =
    ({ player, updateScoreFunction}) => {

    const nameNoSpace = player?.user_name.replace(/\s/g, '');

    console.log(`public/${nameNoSpace}.jpg`);
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', border: '1px solid black', padding: '10px', margin: '10px', borderRadius: '5px', height: '400px', width: '400px'}}>
            <img src={`${nameNoSpace}.jpg`} alt={player?.user_name} style={{width: '200px'}} />
            <Typography variant={'h3'}>{player?.user_name}</Typography>
            <Box sx={{display: 'flex'}}>
                <Button onClick={() => updateScoreFunction(player?.pkey, -1)}>-</Button>
                <Button onClick={() => updateScoreFunction(player?.pkey, 1)}>+</Button>
            </Box>

            <Typography variant={'h4'}>{player?.user_score}</Typography>
        </Box>

    );

}

export default PlayerCard;