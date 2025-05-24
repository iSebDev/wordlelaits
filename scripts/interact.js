import { Utils } from "./utils.js";

export class Interaction {
    constructor() {
        this.letters = document.querySelectorAll(".letter-column");
        this.keyBoard = document.querySelectorAll(".key-btn");

        this.selected = null;
        this.playingRow = null;
        
        this.attempts = null;

        this.utils = new Utils();
    }

    setContext(selected, playingRow) {
        this.selected = selected;
        this.playingRow = playingRow;
        this.letters = document.querySelectorAll(".enabled.playing .letter-column");
    }

    writeLetter(letter) {      
        if (!this.selected.querySelector("span")) return;

        this.selected.querySelector("span").textContent = letter.toUpperCase();
        this.moveToNext();
    }

    moveLeft() {
        if (!this.selected) {
            this.setSelected(this.playingRow.lastChild);
            return;
        } 

        let previous = null;
        for (let i of this.letters) {
            if (i.classList.contains("selected")) {
                if (previous) {
                    this.setSelected(previous);
                }
                return;
            }
            previous = i;
        }
    }
    
    moveRight() {
        if (!this.selected && this.playingRow !== null) {
            this.setSelected(this.playingRow.firstChild);
            return;
        }

        let found = false;
        for (let i of this.letters) {
            if (found) {
                this.setSelected(i);
                return;
            }
            if (i.classList.contains("selected")) {
                found = true;
            }
        }
    }

    moveToNext() {
        let found = false;
        for (let i of this.letters) {
            if (found) {
                this.setSelected(i);
                return;
            }
            if (i.classList.contains("selected")) {
                found = true;
            }
        }
        this.clearSelection();
    }

    moveToPrevious() {
        let previous = null;
        for (let i of this.letters) {
            if (i.classList.contains("selected")) {
                if (previous) this.setSelected(previous);
                return;
            }
            previous = i;
        }
    }

    setSelected(element) {
        this.clearSelection();
        element.classList.add("selected");
        this.selected = element;
    }

    clearSelection() {
        this.letters.forEach((i) => i.classList.remove("selected"));
    }

    backspaceSelected() {
        if (this.selected) {
            this.moveToPrevious();
            this.selected.querySelector("span").textContent = "";
        } else {
            this.backspaceNoSelected();
        }
    }

    backspaceNoSelected() {
        if (!this.playingRow) return;

        const letters = Array.from(this.playingRow.querySelectorAll(".letter-column"));
        const filled = letters.filter(l => l.querySelector("span").textContent !== "");

        if (filled.length === 0) return;

        const lastFilled = filled[filled.length - 1];
        this.setSelected(lastFilled);
        lastFilled.querySelector("span").textContent = "";
    }

    checkWordsFromStart(word) {
        const data = this.utils.getLocalData();
        
        const attempts = Array.from(document.querySelectorAll(".wordle-row"))
            .filter(row => !row.classList.contains("enabled"));
    
        let delay = 0;
        attempts.forEach((row) => {
            row.querySelectorAll("div").forEach((l, i) => {
                setTimeout(() => {
                    if (l.querySelector("span").textContent === String(word).charAt(i)) {
                        l.classList.add("correct");
                    } else {
                        l.classList.add("used");
                    }
                }, delay);
                delay += 150;
            });
        });
    }

    checkWord(word) {
        const data = this.utils.getLocalData();
        
        const attempts = Array.from(document.querySelectorAll(".wordle-row"))
            .filter(row => !row.classList.contains("enabled"));
    }

    data() {
        const data = this.utils.getLocalData();
        const date = this.utils.getFormattedDate();

        if (!data || !Array.isArray(data["attempts"]) || date !== data["date"]) {
            this.utils.clearLocalData();
            return;
        }

        const rows = document.querySelectorAll(".wordle-row");
        let lastFilledLetter = null;

        data["attempts"].forEach((attempt, idx) => {
            if (idx >= rows.length) return;

            const row = rows[idx];
            row.classList.add("playing");

            const letters = row.querySelectorAll(".letter-column");

            String(attempt).split("").forEach((l, i) => {
                if (letters[i]) {
                    letters[i].querySelector("span").textContent = l.toUpperCase();
                    lastFilledLetter = letters[i];
                }
            });
            row.classList.remove("enabled");
            row.classList.remove("playing");
        });

        if (lastFilledLetter) {
            this.clearSelection();
        }

        let nextRow = null;
        for (let row of rows) {
            const letters = row.querySelectorAll(".letter-column");
            const isEmpty = Array.from(letters).every(l => l.querySelector("span").textContent === "");
            if (isEmpty) {
                nextRow = row;
                break;
            }
        }

        if (nextRow) {
            nextRow.classList.add("enabled", "playing");
            this.playingRow = nextRow;
            this.letters = nextRow.querySelectorAll(".letter-column");
        } else {
            this.playingRow = null;
            this.letters = [];
        }

        this.send();
    }

    send() {
        if (!this.playingRow) return;

        const letters = Array.from(this.playingRow.querySelectorAll(".letter-column"));
        const filled = letters.filter(l => l.querySelector("span").textContent !== "");

        if (filled.length < letters.length) return;

        const word = filled.map(l => l.querySelector("span").textContent).join("");

        const allAttempts = Array.from(document.querySelectorAll(".wordle-row"))
            .filter(row => !row.classList.contains("enabled"))
            .concat([this.playingRow]);

        const attempts = allAttempts.map(row => 
            Array.from(row.querySelectorAll(".letter-column"))
            .map(j => j.querySelector("span").textContent)
            .join("")
        );

        this.playingRow.classList.remove("enabled");
        this.playingRow.classList.remove("playing");

        this.playingRow = document.querySelector(".wordle-row.enabled");

        this.moveRight();
        
        this.playingRow?.classList.add("playing"); 

        this.letters.forEach((i) => i.classList.remove("selected"));
        
        this.utils.setLocalData({
            word: word,
            attempts: attempts
        });

        this.selected = null;
    }
}
