export class Handler {
    constructor() {
        this.letters = document.querySelectorAll(".letter-column");

        this.letterKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"];
        this.backspace = "Backspace"

        this.keyPressHandler();
        this.letterPressHandler();
    }

    keyPressHandler() {
        document.addEventListener("keypress", (e) => {
            if (!this.letterKeys.includes(e.key)) return;
        });
    }

    letterPressHandler() {
        this.letters.forEach((i) => {
            i.addEventListener("click", () => {
                if (!i.parentElement.classList.contains("playing")) return;

                this.letters.forEach((j) => j.classList.remove("selected") )

                i.classList.add("selected");
            });
        });
    }
}