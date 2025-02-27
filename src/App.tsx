import React, {useEffect, useState} from "react";
import PlayerCard from "./components/PlayerCard";
import { API_URL, BACKEND_PING_FREQUENCY } from "./data/ServerVariables";
import { DEFAULT_GAME_SETTINGS } from "./data/GameSettings";
import {Box, Stack} from "@mui/material";
import axios from "axios";
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';

export interface Player {
    pkey: number;
    user_name: string;
    user_score: number;
}


const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [serverIsAlive, setServerIsAlive] = useState<boolean>(true);

  useEffect (() => {
        fetchScores();
  }, []);

  useEffect (() => {
      console.log("Players: ", players)
  }, [players]);

  const updateUserScore = async (pkey: number, delta: number) => {
      try{
          console.log("PKey: ", pkey, " Delta: ", delta);
          const response = await axios.post(`${API_URL}/update`, {
              pkey,
              delta
          });
          if(!serverIsAlive) setServerIsAlive(true);
      } catch (error: any) {
            console.error("SQL Error: ", error?.response?.data?.error?.sqlMessage ?? error);
            setServerIsAlive(false);
      }


      fetchScores();
  }

  const fetchScores = async () => {
      try {
          const response = await fetch(`${API_URL}/scores`);
          const data = await response.json();
          console.log("Data: ", data);

          const playersIncluded = DEFAULT_GAME_SETTINGS.playerNames.map((playerName) => {
                return data.find((player: Player) => player.user_name === playerName);
          });
          setPlayers(playersIncluded);
          if(!serverIsAlive) setServerIsAlive(true);
      } catch (error) {
          console.error(error);
          setServerIsAlive(false);
      }
  }

  return (
      <Stack sx={{height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: '30px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '800px', minHeight: '1200px'}}>
              {players.map((player) => (
                  <PlayerCard player={player} updateScoreFunction={updateUserScore} key={player.pkey} />))
              }
          </Box>
          <Box sx={{minWidth: '800px', display: 'flex', justifyContent: 'flex-end'}}>
              {serverIsAlive ? <SignalCellular4BarIcon color={'success'} fontSize={'large'}/> : <SignalCellular4BarIcon color={'error'} fontSize={'large'}/>}
          </Box>

      </Stack>



  );
};

export default App;