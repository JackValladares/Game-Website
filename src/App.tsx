import React, {useEffect, useRef, useState} from "react";
import PlayerCard from "./components/PlayerCard";
import Countdown from "./components/Countdown";
import NetworkStatus from "./components/NetworkStatus";
import { API_URL, BACKEND_PING_FREQUENCY, BACKEND_UPDATE_FREQUENCY } from "./data/ServerVariables";
import { DEFAULT_GAME_SETTINGS } from "./data/GameSettings";
import {Box, Button, Card, Stack, ToggleButton, Typography, useTheme} from "@mui/material";
import axios from "axios";
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import useCountdownHook from "./utilities/countdownHook";
import GameButton from "./components/Button";

export interface Player {
    pkey: number;
    user_name: string;
    user_score: number;
    delta: number;
}

const axiosInstance = axios.create({
    baseURL: '', // Ensures no automatic baseURL prepending
});


const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [serverIsAlive, setServerIsAlive] = useState<boolean>(true);
  const [epilepsyMode, setEpilepsyMode] = useState<boolean>(true);



  const currentColor = useRef<string>(DEFAULT_GAME_SETTINGS.colorCycle[0]);

  const theme = useTheme();


  const { countdown } = useCountdownHook({interval: DEFAULT_GAME_SETTINGS?.countdownInterval ?? 100});

    useEffect(() => {
        const interval = setInterval(() => {
            if(epilepsyMode)
            {
                const currentColorIndex = DEFAULT_GAME_SETTINGS.colorCycle.indexOf(currentColor.current);
                const nextColorIndex = (currentColorIndex + 1) % DEFAULT_GAME_SETTINGS.colorCycle.length;
                //console.log("Current Color Index: ", currentColorIndex, " Next Color Index: ", nextColorIndex);
                currentColor.current = DEFAULT_GAME_SETTINGS.colorCycle[nextColorIndex];

                // ✅ Use `document.body.style` instead of `useState` to update the background
                document.body.style.backgroundColor = currentColor.current;
            } else{
                document.body.style.backgroundColor = theme.palette.background.paper;
            }

        }, 500);

        return () => clearInterval(interval);
    }, [epilepsyMode]);




    useEffect(() => {
        // ✅ Update UI from the server every BACKEND_PING_FREQUENCY
        const fetchInterval = setInterval(() => {
            fetchScores();
        }, BACKEND_PING_FREQUENCY);

        return () => clearInterval(fetchInterval);
    }, []);

    useEffect(() => {
        // ✅ Send `delta` updates to the backend every BACKEND_PING_FREQUENCY
        const syncInterval = setInterval(() => {
            setPlayers((prevPlayers) => {
                const playersWithChanges = prevPlayers.filter((player) => player.delta !== 0);

                if (playersWithChanges.length > 0) {
                    playersWithChanges.forEach((player) => {
                        updateUserScore(player.pkey, player.delta);
                    });
                }

                return prevPlayers.map((player) => ({ ...player, delta: 0 }));
            });
        }, BACKEND_UPDATE_FREQUENCY);

        return () => clearInterval(syncInterval);
    }, []);




    const updateUserDelta = (pkey: number, delta: number) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.pkey === pkey ? { ...player, delta: player.delta + delta } : player
            )
        );
    };

    const updateUserScore = async (pkey: number, delta: number) => {
        try {
            console.log("Updating score:", { pkey, delta });
            await axiosInstance.post(`${API_URL}/update`, { pkey, delta });
            if (!serverIsAlive) setServerIsAlive(true);
        } catch (error: any) {
            console.error("SQL Error:", error?.response?.data?.error?.sqlMessage ?? error);
            setServerIsAlive(false);
        }
    };


    const fetchScores = async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/scores`);

            const data = response.data;

            setPlayers((prevPlayers) =>
                DEFAULT_GAME_SETTINGS.playerNames.map((playerName) => {
                    const foundPlayer = data.find((p: Player) => p.user_name === playerName);
                    const existingPlayer = prevPlayers.find((p) => p.pkey === foundPlayer?.pkey);

                    return {
                        ...foundPlayer,
                        delta: existingPlayer ? existingPlayer.delta : 0, // Keep local delta
                    };
                })
            );

            if (!serverIsAlive) setServerIsAlive(true);
        } catch (error) {
            console.error(error);
            setServerIsAlive(false);
        }
    };



  return (
      <Stack sx={{minHeight: '100vh', alignItems: 'center', justifyContent: 'center', paddingTop: '30px'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center' +
                  '', width: '80%', maxWidth: '1200px', backgroundColor: theme.palette.background.default, padding: '20px'}}>
              <Countdown countdown={countdown} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%', maxWidth: '1200px', minHeight: '600px', backgroundColor: theme.palette.background.default, padding: '20px'}}>
              {players.map((player) => (
                  <PlayerCard player={player} updateScoreFunction={updateUserDelta} key={player.pkey} />))
              }
          </Box>
          <Box sx={{width: '80%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.background.default, padding: '20px'}}>
              <GameButton onClick={() => setEpilepsyMode(!epilepsyMode)} >{epilepsyMode ? 'Fun Mode' : 'Boring Mode'}</GameButton>
              <NetworkStatus serverIsAlive={serverIsAlive} message={serverIsAlive ? 'Server is Connected!' : 'Server is Disconnected!'} />
          </Box>
      </Stack>



  );
};

export default App;