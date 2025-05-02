export class Handler {
    constructor() {
        this.letters = document.querySelectorAll(".letter-column");

        this.letterKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"];
        this.backspace = "Backspace"

        this.selected = null;

        this.keyPressHandler();
        this.letterPressHandler();
    }

    keyPressHandler() {
        document.addEventListener("keypress", (e) => {
            if (!this.letterKeys.includes(e.key)) return;
            this.updateEvent();

            if (selected === null) return;
            this.selected.textContent = e.key.toString().toUpperCase();

            var previous = null;
            var selected = null;

            const letters = document.querySelectorAll(`.enabled.playing .letter-column`);

            letters.forEach((i) => {
                if (i.classList.contains("selected")) previous = i;

                if (previous !== null) selected = i;
            });

            this.letters.forEach((i) => i.classList.remove("selected") )
            
            selected.classList.add("selected");
        });

        document.addEventListener("keydown", (e) => {
            this.updateEvent();

            if (e.key === this.backspace) this.selected.textContent = "";
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

    updateEvent() {
        this.selected = document.querySelector(".letter-column.selected span");
    }
}