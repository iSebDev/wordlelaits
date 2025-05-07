import { Interaction } from "./interact.js";

export class Handler {
    constructor(panel, keyboard) {
        this.panel = panel;
        this.keyboard = keyboard;

        this.letters = document.querySelectorAll(".letter-column");
        this.letterKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"];
        
        this.backspace = "Backspace";
        this.left = "ArrowLeft";
        this.right = "ArrowRight";
        this.enter = "Enter";

        this.keyBoard = document.querySelectorAll(".key-btn");

        this.interaction = new Interaction();

        this.selected = null;
        this.playingRow = null;

        this.keyPressHandler();
        this.letterPressHandler();
        this.keyBoardHandler();

        this.updateEvent();

        this.interaction.moveRight();
    }

    keyPressHandler() {
        document.addEventListener("keypress", (e) => {
            if (!this.letterKeys.includes(e.key)) return;
            this.updateEvent();
            if (!this.selected) return;
            this.interaction.writeLetter(e.key);
        });

        document.addEventListener("keydown", (e) => {
            this.updateEvent();
            switch (e.key) {
                case this.backspace:
                    this.interaction.backspaceSelected();
                    break;
                case this.left:
                    this.interaction.moveLeft();
                    break;
                case this.right:
                    this.interaction.moveRight();
                    break;
                case this.enter:
                    this.interaction.send();
                    break;
                default:
                    break;
            }
        });
    }

    letterPressHandler() {
        this.letters.forEach((i) => {
            i.addEventListener("click", () => {
                if (!i.parentElement.classList.contains("playing")) return;
                this.letters.forEach((j) => j.classList.remove("selected"));
                i.classList.add("selected");
                this.updateEvent();
            });
        });
    }

    keyBoardHandler() {
        this.keyBoard.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.updateEvent();
                switch (btn.id) {
                    case "btn-1":
                        this.interaction.backspaceSelected();
                        break;
                    case "btn-0":
                        this.interaction.send();
                        break;
                    default:
                        this.interaction.writeLetter(btn.ariaLabel);
                        break;
                }
            });
        });
    }

    updateEvent() {
        this.playingRow = document.querySelector(".enabled.playing");
        this.selected = this.playingRow?.querySelector(".letter-column.selected");
        this.interaction.setContext(this.selected, this.playingRow);
    }
}
