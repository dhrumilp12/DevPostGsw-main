
exampleUsage();

// Checks if a value is a string
export const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
};

// Formats a number as a currency string (e.g., $1,234.56)
export const formatMoney = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

// Validates an email address using a regular expression
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Validates a password (example: at least 8 characters, includes letters and numbers)
export const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
};

// Generates a random string of a specified length
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Deep clones an object (to avoid reference issues)
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Debounce function (for limiting rapid function invocations, e.g., in search inputs)
export const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

// Add more helper functions as needed...
