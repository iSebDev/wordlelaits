document.addEventListener("DOMContentLoaded", () => {
    const keyData = "q w e r t y u i o p,a s d f g h j k l ñ,0 z x c v b n m 1";
    const svg = {
        "0": "assets/svg/icon-ch.svg",
        "1": "assets/svg/icon-rm.svg"
    };

    class keyboardWrapper {
        constructor(dataString) {
            this.rowDataArray = dataString.split(",");
            this.keyboardDiv = document.getElementById("keyboard-wrapper");
        }

        constructKeyboard() {
            this.rowDataArray.forEach((i) => {
                const keyDataArray = i.split(" ");
                const rowDiv = document.createElement("div");

                rowDiv.classList.add("row-div");

                keyDataArray.forEach((j) => {
                    const keyDiv = document.createElement("div");

                    const buttonImg = document.createElement("img");

                    if (j === "0" || j === "1") {
                        buttonImg.setAttribute("src", svg[j]);
                        buttonImg.style.width = "1.5rem";
                        keyDiv.style.width = "15%";
                        keyDiv.appendChild(buttonImg)
                    } else {
                        keyDiv.style.width = "10%";
                        keyDiv.textContent = j.toUpperCase();
                        keyDiv.ariaLabel = j;
                    }

                    rowDiv.appendChild(keyDiv);
                });

                this.keyboardDiv.appendChild(rowDiv);
            })
        }
    }

    const keyboard = new keyboardWrapper(keyData); 

    keyboard.constructKeyboard();
});