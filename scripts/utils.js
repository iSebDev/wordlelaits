export class Utils {
    constructor() {
        //this.monitorLocalStorage();
    }
    
    getFormattedDate = () => {
        const d = new Date();
        return `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}${d.getFullYear()}`;
    };
    
    superEncrypt = (str) => {
        const strBuffer = new TextEncoder().encode(str);
        const hashBuffer = crypto.subtle.digest("SHA-256", strBuffer);
        return hashBuffer.then((hash) => {
            const hashArray = Array.from(new Uint8Array(hash));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).reverse().join("");
            return hashHex;
        }); 
    }
    
    getLocalData = () => {
        const data = localStorage.getItem(this.superEncrypt(this.getFormattedDate()));
        if (!data) return null;

        const decryptedData = Array.from(data).map((char) => {
            const charCode = char.charCodeAt(0) - 1;
            return String.fromCharCode(charCode); 
        }).reverse().join("");

        try {
            return JSON.parse(decryptedData);
        } catch (e) {
            return null;
        }
    }
    
    transformLocalData = () => {
        const data = this.getLocalData();
        if (!data) return null;
        const transformedData = {
            ...data,
            date: this.getFormattedDate(),
            word: data.word.toUpperCase(),
            attempts: data.attempts.map(attempt => attempt.toUpperCase())
        };
        return transformedData;
    }
    
    setLocalData = (data) => {
        this.clearLocalData();
        
        const mainData = {
            ...data,
            date: this.getFormattedDate(),
            word: data.word.toUpperCase(),
            attempts: data.attempts.map(attempt => attempt.toUpperCase())
        };

        const jsonData = JSON.stringify(mainData);

        const finalData = Array.from(jsonData).map((char) => {
            const charCode = char.charCodeAt(0) + 1;
            return String.fromCharCode(charCode); 
        }).reverse().join("");

        localStorage.setItem(this.superEncrypt(this.getFormattedDate()), finalData);
    }
    
    clearLocalData = () => {
        localStorage.clear();
    }
}
