export class Interaction {
    constructor() {
        this.letters = document.querySelectorAll(".letter-column");
        this.keyBoard = document.querySelectorAll(".key-btn");

        this.selected = null;
        this.playingRow = null;
    }

    setContext(selected, playingRow) {
        this.selected = selected;
        this.playingRow = playingRow;
        this.letters = document.querySelectorAll(".enabled.playing .letter-column");
    }

    writeLetter(letter) {        
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
        if (!this.selected) {
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
            this.selected.querySelector("span").textContent = "";
            this.moveToPrevious();
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
        this.moveToPrevious();
    }

    send() {
        if (!this.playingRow) return;

        const letters = Array.from(this.playingRow.querySelectorAll(".letter-column"));
        const filled = letters.filter(l => l.querySelector("span").textContent !== "");

        if (filled.length < this.letters.length) return;

        const word = filled.map(l => l.querySelector("span").textContent).join("");

        alert("pase 2");

        this.playingRow.classList.remove("enabled");
        this.playingRow.classList.remove("playing");

        this.playingRow = document.querySelector(".wordle-row.enabled");

        this.moveRight();
        
        if (!this.playingRow) return;

        this.playingRow.classList.add("playing"); 

        this.letters.forEach((i) => i.classList.remove("selected"));
        this.selected = null;

        return word;
    }
}
