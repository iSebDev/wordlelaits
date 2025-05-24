import { KeyboardWrapper, WordlePanel } from "./scripts/wordle.js";
import { Handler } from "./scripts/event.js";

document.addEventListener("DOMContentLoaded", () => {
    const keyboard = new KeyboardWrapper();
    keyboard.constructKeyboard();

    const panel = new WordlePanel("MOMOS", 5, 6);
    panel.createRow();
    panel.update();

    const handler = new Handler(panel, keyboard);
    handler.updateEvent();
});