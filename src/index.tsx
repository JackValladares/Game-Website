import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ThemeProvider} from "@mui/material";
import {CountdownAppTheme} from "./theme/CountdownAppTheme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(

    <ThemeProvider theme={CountdownAppTheme}>
        <style>
            {`body {
            margin: 0;
        }`}
        </style>
        <App />
    </ThemeProvider>);
