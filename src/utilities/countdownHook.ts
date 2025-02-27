import React, {useEffect, useState} from "react";
import Countdown from "../components/Countdown";


interface CountdownHookProps {
    interval: number;
}
const useCountdownHook = ({ interval }: CountdownHookProps) => {
    const [countdown, setCountdown] = useState<string>('Loading...');

    const updateTime = () => {
        const countdownDate = new Date('April 1, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    //Ever interval milliseconds, update the countdown
    useEffect(() => {
        updateTime();
        const intervalId = setInterval(() => {
            updateTime();
        }, interval);
        return () => clearInterval(intervalId);
    }, []);



    return {countdown};
}

export default useCountdownHook;