export class Handler {
    constructor() {
        this.letters = document.querySelectorAll(".letter-column");

        this.letterKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"];
        this.backspace = "Backspace"
        
        this.keyBoard = document.querySelectorAll(".key-btn");

        this.selected = null;
        this.playingRow = null;

        this.keyPressHandler();
        this.letterPressHandler();
        this.keyBoardHandler();

        this.updateEvent();
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
                if (previous !== null && selected == null) selected = i;

                if (i.classList.contains("selected")) previous = i;
            });

            this.letters.forEach((i) => i.classList.remove("selected") )
            
            selected.classList.add("selected");
        });

        document.addEventListener("keydown", (e) => {
            this.updateEvent();

            if (e.key === this.backspace) document.querySelector("#btn-1").click();
        });
    }

    letterPressHandler() {        
        this.letters.forEach((i) => {
            i.addEventListener("click", () => {
                if (!i.parentElement.classList.contains("playing")) return;

                this.letters.forEach((j) => j.classList.remove("selected") )

                i.classList.add("selected");

                this.updateEvent()
            });
        });
    }

    keyBoardHandler() {
        this.keyBoard.forEach((i) => {
            i.addEventListener("click", () => {
                if (this.selected === null) return;
                
                var previous = null;
                var selected = null;

                const letters = document.querySelectorAll(`.enabled.playing .letter-column`);

                switch (i.id) {
                    case "btn-0": 
                        break;
                    case "btn-1": 
                        this.updateEvent();
                        this.selected.textContent = "";
                        letters.forEach((i) => {
                            if (!i.classList.contains("selected")) previous = i;
                            else selected = previous;
                        });        
                        break;
                    default:    
                        this.updateEvent();
                        this.selected.textContent = i.ariaLabel.toString().toUpperCase();
                        letters.forEach((i) => {
                            if (previous !== null && selected == null) selected = i;
        
                            if (i.classList.contains("selected")) previous = i;
                        });        
                        break;
                }

                this.letters.forEach((i) => i.classList.remove("selected") )
                
                selected.classList.add("selected");
            });
        });
    }

    updateEvent() {
        this.selected = document.querySelector(".letter-column.selected span");

        this.playingRow = document.querySelector(".enabled.playing");

        if (!(this.selected === null)) return;

        this.selected = this.playingRow.querySelector(".letter-column.selected");
    }
}