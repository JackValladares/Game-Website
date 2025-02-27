export interface GameSettings {
    playerNames: string[];
    colorCycle: string[];
    countdownInterval?: number;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
    playerNames: ["Hieu Dinh", "Harris Collier"],
    colorCycle: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
    countdownInterval: 1000
};