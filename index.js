import { KeyboardWrapper, WordlePanel } from "./scripts/wordle.js";

document.addEventListener("DOMContentLoaded", () => {
    const keyboard = new KeyboardWrapper();
    keyboard.constructKeyboard();

    const panel = new WordlePanel("AUDIO", 5, 6);
    panel.createRow();
});