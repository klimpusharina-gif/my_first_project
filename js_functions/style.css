function sum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

function secretMessage(password, message) {
    return function(inputPassword) {
        if (inputPassword === password) {
            return message;
        }
        return "Доступ запрещен";
    };
}

function compose(...functions) {
    return function(initialValue) {
        return functions.reduceRight((acc, fn) => fn(acc), initialValue);
    };
}

function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

function myReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;
    
    if (initialValue === undefined) {
        if (array.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
    }
    
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...args2) {
            return curried.apply(this, args.concat(args2));
        };
    };
}

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

function createValidator(options) {
    const { minLength = 0, requireDigit = false, requireUppercase = false } = options;
    
    return function(str) {
        if (str.length < minLength) {
            return { isValid: false, error: `Минимальная длина ${minLength} символов` };
        }
        if (requireDigit && !/\d/.test(str)) {
            return { isValid: false, error: "Должна быть хотя бы одна цифра" };
        }
        if (requireUppercase && !/[A-Z]/.test(str)) {
            return { isValid: false, error: "Должна быть хотя бы одна заглавная буква" };
        }
        return { isValid: true, error: null };
    };
}