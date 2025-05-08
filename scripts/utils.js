export class Utils {
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
        const data = localStorage.getItem(superEncrypt(getFormattedDate()));
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Error parsing JSON from localStorage:", e);
            return null;
        }
    }
    
    transformLocalData = () => {
        const data = getLocalData();
        if (!data) return null;
        const transformedData = {
            ...data,
            date: getFormattedDate(),
            word: data.word.toUpperCase(),
            attempts: data.attempts.map(attempt => attempt.toUpperCase())
        };
        return transformedData;
    }
    
    setLocalData = (data) => {
        const transformedData = {
            ...data,
            date: getFormattedDate(),
            word: data.word.toUpperCase(),
            attempts: data.attempts.map(attempt => attempt.toUpperCase())
        };
        localStorage.setItem(superEncrypt(getFormattedDate()), JSON.stringify(transformedData));
    }
    
    clearLocalData = () => {
        if (superEncrypt(getFormattedDate())) return;
        localStorage.clear();
    }
}
