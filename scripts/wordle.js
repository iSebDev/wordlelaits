export class KeyboardWrapper {
    constructor() {
        this.keyData = "q w e r t y u i o p,a s d f g h j k l ñ,0 z x c v b n m 1";
        this.rows = this.keyData.split(",");
        this.keyboardDiv = document.getElementById("keyboard-wrapper");
        this.svgPaths = {
            "0": "../assets/svg/icon-ch.svg",
            "1": "../assets/svg/icon-rm.svg"
        };
    }

    createKey(key) {
        const keyDiv = document.createElement("div");
        keyDiv.className = "key-btn";

        if (this.svgPaths[key]) {
            const img = document.createElement("img");
            img.src = this.svgPaths[key];
            keyDiv.appendChild(img);
            keyDiv.style.width = "15%";
            keyDiv.id = `btn-${key}`;
        } else {
            keyDiv.textContent = key.toUpperCase();
            keyDiv.setAttribute("aria-label", key);
            keyDiv.style.width = "10%";
        }

        return keyDiv;
    }

    constructKeyboard() {
        this.rows.forEach(row => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "row-div";

            row.split(" ").forEach(key => {
                const keyDiv = this.createKey(key);
                rowDiv.appendChild(keyDiv);
            });

            this.keyboardDiv.appendChild(rowDiv);
        });
    }
}

class WordRow {
    constructor(word, length) {
        this.word = word;
        this.length = length;
        this.panel = document.getElementById("wordle-panel");

        this.spawnRow();
    }

    spawnRow() {
        const panelRow = document.createElement("div");
        panelRow.className = "wordle-row enabled";

        const id = this.panel.childElementCount > 0 ? this.panel.childElementCount + 1 : 1;
        panelRow.id = `row-${id}`;
        
        panelRow.style.gridTemplateColumns = "repeat(1, 6fr)";

        this.panel.appendChild(panelRow);

        this.spawnLetters(panelRow);
    }

    spawnLetters(row) {
        for (let i=0; i<this.length; i++) {
            const letterColumn = document.createElement("div");
            letterColumn.className = "letter-column";

            const id = row.childElementCount > 0 ? row.childElementCount + 1 : 1; 
            letterColumn.id = `letter-${id}`;

            const span = document.createElement("span");

            letterColumn.appendChild(span);

            row.appendChild(letterColumn);
        }
    }
}

export class WordlePanel {
    constructor(word, length, max) {
        this.word = word;
        this.length = length;
        this.max = max;
    }
    
    createRow() {
        for (let i=0; i<this.max; i++) {
            new WordRow(this.word, this.length);
        }
    }

    update() {
        document.querySelector(".wordle-row.enabled").classList.add("playing");
    }
}
