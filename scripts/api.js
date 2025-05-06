export default class WordleAPI {
    constructor() {
        this.word = null;
        this.length = null;
        this.max = null;
        this.keyboardDiv = document.getElementById("keyboard-panel");
        this.wordlePanel = document.getElementById("wordle-panel");
    }
}