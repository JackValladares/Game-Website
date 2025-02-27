import { createTheme } from "@mui/material";

export const CountdownAppTheme = createTheme({
    palette: {
        primary: {
            main: "#ffffff", // Orange for urgency
        },
        secondary: {
            main: "#0a85bb", // Light blue for contrast
        },
        success: {
            main: "#4caf50", // Green
        },
        error: {
            main: "#f44336", // Red
        },
        warning: {
            main: "#ffb74d", // Warm yellow-orange
        },
        info: {
            main: "#64b5f6", // Light blue
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0bec5",
        },
        background: {
            default: "#021221", // Deep midnight blue
            paper: "#02243f", // Dark blue
        },
    },
});
