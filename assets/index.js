document.addEventListener("DOMContentLoaded", () => {
    const keyData = "q w e r t y u i o p,a s d f g h j k l ñ,0 z x c v b n m 1";
    const svgPaths = {
        "0": "assets/svg/icon-ch.svg",
        "1": "assets/svg/icon-rm.svg"
    };

    class KeyboardWrapper {
        constructor(dataString) {
            this.rows = dataString.split(",");
            this.keyboardDiv = document.getElementById("keyboard-wrapper");
        }

        createKey(key) {
            const keyDiv = document.createElement("div");
            keyDiv.className = "key-btn";

            if (svgPaths[key]) {
                const img = document.createElement("img");
                img.src = svgPaths[key];
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

    new KeyboardWrapper(keyData).constructKeyboard();
});