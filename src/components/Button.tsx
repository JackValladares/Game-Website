import React from "react";
import {Button, useTheme} from "@mui/material";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    sx?: any;
}
const GameButton: React.FC<ButtonProps> = ({ onClick, children, sx }) => {
    const theme = useTheme();

    return (
        <Button onClick={onClick}
                sx={{
                    borderRadius: '10px',
                    padding: '0px 5px',
                    fontSize: '1.5rem',
                    '&:hover': {
                        backgroundColor: theme.palette.secondary.dark
                    },
                    backgroundColor: theme.palette.secondary.main,

                    ...sx
                }}

        >{children}</Button>
    )
}

export default GameButton;