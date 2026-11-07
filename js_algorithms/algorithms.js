function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
}

function factorial(n) {
    if (n < 0) return -1;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^а-яa-z0-9]/g, '');
    let left = 0;
    let right = cleanStr.length - 1;
    
    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) return false;
        left++;
        right--;
    }
    return true;
}

function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiouy';
    let count = 0;
    const lowerStr = str.toLowerCase();
    
    for (let i = 0; i < lowerStr.length; i++) {
        if (vowels.includes(lowerStr[i])) {
            count++;
        }
    }
    return count;
}

function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

function findLongestWord(sentence) {
    const words = sentence.split(' ');
    let longest = '';
    
    for (let i = 0; i < words.length; i++) {
        const cleanWord = words[i].replace(/[^а-яa-z]/gi, '');
        if (cleanWord.length > longest.length) {
            longest = cleanWord;
        }
    }
    return longest;
}

function findMax(arr) {
    if (!arr || arr.length === 0) return undefined;
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function removeDuplicates(arr) {
    const unique = [];
    const seen = new Set();
    
    for (let i = 0; i < arr.length; i++) {
        if (!seen.has(arr[i])) {
            seen.add(arr[i]);
            unique.push(arr[i]);
        }
    }
    return unique;
}

function bubbleSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (sorted[j] > sorted[j + 1]) {
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return sorted;
}

function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function formatCurrency(amount, currency = '₽') {
    const parts = amount.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${parts.join('.')} ${currency}`;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generatePassword(length = 8) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}