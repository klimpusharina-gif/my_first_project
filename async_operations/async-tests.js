function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Успех!");
            } else {
                reject("Ошибка!");
            }
        }, 1000);
    });
}

function handleBasicPromise() {
    const output = document.getElementById('promise-output');
    if (!output) return;
    output.textContent = 'Загрузка...';
    
    createBasicPromise(true)
        .then(result => {
            output.textContent = `Результат: ${result}`;
            output.className = 'output success';
        })
        .catch(error => {
            output.textContent = `Ошибка: ${error}`;
            output.className = 'output error';
        });
}

function createPromiseChain() {
    const output = document.getElementById('promise-output');
    if (!output) return;
    output.textContent = 'Запуск цепочки промисов...';

    const promise1 = new Promise(resolve => setTimeout(() => resolve('Шаг 1'), 500));
    
    promise1
        .then(result => {
            output.textContent = result;
            return new Promise(resolve => setTimeout(() => resolve('Шаг 2'), 500));
        })
        .then(result => {
            output.textContent += ` -> ${result}`;
            return new Promise(resolve => setTimeout(() => resolve('Шаг 3'), 500));
        })
        .then(result => {
            output.textContent += ` -> ${result}`;
            output.className = 'output success';
        })
        .catch(error => {
            output.textContent = `Ошибка: ${error}`;
            output.className = 'output error';
        });
}

function handlePromiseError() {
    const output = document.getElementById('promise-output');
    if (!output) return;
    output.textContent = 'Загрузка...';

    createBasicPromise(false)
        .then(result => {
            output.textContent = `Результат: ${result}`;
            output.className = 'output success';
        })
        .catch(error => {
            output.textContent = `Ошибка: ${error}`;
            output.className = 'output error';
        });
}

function setupPromiseEvents() {
    const basicBtn = document.getElementById('basic-promise');
    const chainBtn = document.getElementById('promise-chain');
    const errorBtn = document.getElementById('promise-error');
    
    if (basicBtn) basicBtn.addEventListener('click', handleBasicPromise);
    if (chainBtn) chainBtn.addEventListener('click', createPromiseChain);
    if (errorBtn) errorBtn.addEventListener('click', handlePromiseError);
}

async function basicAsyncAwait() {
    const output = document.getElementById('async-output');
    if (!output) return;
    output.textContent = 'Загрузка...';

    try {
        const result = await createBasicPromise(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        output.textContent = `Результат: ${result}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error}`;
        output.className = 'output error';
    }
}

async function handleAsyncError() {
    const output = document.getElementById('async-output');
    if (!output) return;
    output.textContent = 'Загрузка...';

    try {
        await createBasicPromise(false);
    } catch (error) {
        output.textContent = `Перехвачено исключение: ${error}`;
        output.className = 'output error';
    }
}

async function parallelAsyncExecution() {
    const output = document.getElementById('async-output');
    if (!output) return;
    output.textContent = 'Параллельное выполнение...';
    const startTime = Date.now();

    try {
        const promises = [
            new Promise(resolve => setTimeout(() => resolve('Задача 1'), 1000)),
            new Promise(resolve => setTimeout(() => resolve('Задача 2'), 1500)),
            new Promise(resolve => setTimeout(() => resolve('Задача 3'), 500))
        ];

        const results = await Promise.all(promises);
        const endTime = Date.now();
        
        output.textContent = `Результаты: ${results.join(', ')}. Время: ${endTime - startTime} мс`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error}`;
        output.className = 'output error';
    }
}

function setupAsyncEvents() {
    const basicBtn = document.getElementById('basic-async');
    const errorBtn = document.getElementById('async-error');
    const parallelBtn = document.getElementById('async-parallel');
    
    if (basicBtn) basicBtn.addEventListener('click', basicAsyncAwait);
    if (errorBtn) errorBtn.addEventListener('click', handleAsyncError);
    if (parallelBtn) parallelBtn.addEventListener('click', parallelAsyncExecution);
}

async function fetchUsers() {
    const output = document.getElementById('api-output');
    const dataContainer = document.getElementById('api-data');
    if (!output || !dataContainer) return;

    output.textContent = 'Загрузка пользователей...';
    dataContainer.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const users = await response.json();
        output.textContent = `Загружено пользователей: ${users.length}`;
        output.className = 'output success';

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}<br>Город: ${user.address.city}`;
            dataContainer.appendChild(card);
        });
    } catch (error) {
        output.textContent = `Ошибка загрузки: ${error.message}`;
        output.className = 'output error';
    }
}

async function createPost() {
    const output = document.getElementById('api-output');
    if (!output) return;

    output.textContent = 'Отправка поста...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержимое нового поста',
                userId: 1,
            }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        output.textContent = `Пост создан. ID: ${data.id}, Заголовок: ${data.title}`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка отправки: ${error.message}`;
        output.className = 'output error';
    }
}

async function testApiError() {
    const output = document.getElementById('api-output');
    if (!output) return;

    output.textContent = 'Тестирование ошибки API...';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/nonexistent');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        output.textContent = JSON.stringify(data);
    } catch (error) {
        output.textContent = `Поймана ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

function setupApiEvents() {
    const usersBtn = document.getElementById('fetch-users');
    const postBtn = document.getElementById('fetch-post');
    const errorBtn = document.getElementById('fetch-error');
    
    if (usersBtn) usersBtn.addEventListener('click', fetchUsers);
    if (postBtn) postBtn.addEventListener('click', createPost);
    if (errorBtn) errorBtn.addEventListener('click', testApiError);
}

async function demonstratePromiseAll() {
    const output = document.getElementById('parallel-output');
    if (!output) return;
    output.textContent = 'Promise.all выполняется...';
    const start = Date.now();

    const p1 = new Promise(r => setTimeout(() => r('Результат 1'), 1000));
    const p2 = new Promise(r => setTimeout(() => r('Результат 2'), 2000));
    const p3 = new Promise(r => setTimeout(() => r('Результат 3'), 1500));

    try {
        const results = await Promise.all([p1, p2, p3]);
        const end = Date.now();
        output.textContent = `Promise.all: ${results.join(', ')} (Время: ${end - start} мс)`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка в Promise.all: ${error}`;
        output.className = 'output error';
    }
}

async function demonstratePromiseRace() {
    const output = document.getElementById('parallel-output');
    if (!output) return;
    output.textContent = 'Promise.race выполняется...';
    const start = Date.now();

    const p1 = new Promise(r => setTimeout(() => r('Быстрый (1с)'), 1000));
    const p2 = new Promise(r => setTimeout(() => r('Медленный (3с)'), 3000));

    try {
        const result = await Promise.race([p1, p2]);
        const end = Date.now();
        output.textContent = `Promise.race: Победитель -> ${result} (Время: ${end - start} мс)`;
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка в Promise.race: ${error}`;
        output.className = 'output error';
    }
}

async function demonstratePromiseAllSettled() {
    const output = document.getElementById('parallel-output');
    if (!output) return;
    output.textContent = 'Promise.allSettled выполняется...';
    const start = Date.now();

    const p1 = new Promise(r => setTimeout(() => r('Успех 1'), 1000));
    const p2 = new Promise((_, rej) => setTimeout(() => rej('Ошибка 1'), 1500));
    const p3 = new Promise(r => setTimeout(() => r('Успех 2'), 500));

    const results = await Promise.allSettled([p1, p2, p3]);
    const end = Date.now();
    
    const fulfilled = results.filter(r => r.status === 'fulfilled').length;
    const rejected = results.filter(r => r.status === 'rejected').length;

    output.textContent = `Promise.allSettled: Выполнено - ${fulfilled}, Отклонено - ${rejected} (Время: ${end - start} мс)`;
    output.className = 'output warning';
}

function setupParallelEvents() {
    const allBtn = document.getElementById('promise-all');
    const raceBtn = document.getElementById('promise-race');
    const allSettledBtn = document.getElementById('promise-allSettled');
    
    if (allBtn) allBtn.addEventListener('click', demonstratePromiseAll);
    if (raceBtn) raceBtn.addEventListener('click', demonstratePromiseRace);
    if (allSettledBtn) allSettledBtn.addEventListener('click', demonstratePromiseAllSettled);
}

async function sequentialApiRequests() {
    const output = document.getElementById('scenario-output');
    if (!output) return;
    output.textContent = 'Последовательные запросы...';

    try {
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userResponse.json();
        output.textContent = `1. Пользователь: ${user.name}\n`;

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        output.textContent += `2. Постов найдено: ${posts.length}\n`;

        if (posts.length > 0) {
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}/comments`);
            const comments = await commentsResponse.json();
            output.textContent += `3. Комментариев к первому посту: ${comments.length}`;
        }
        output.className = 'output success';
    } catch (error) {
        output.textContent = `Ошибка: ${error.message}`;
        output.className = 'output error';
    }
}

async function simulateFileUpload() {
    const output = document.getElementById('scenario-output');
    const progressFill = document.getElementById('progress-fill');
    if (!output || !progressFill) return;

    output.textContent = 'Начинается симуляция загрузки...';
    progressFill.style.width = '0%';

    for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        progressFill.style.width = `${i}%`;
        output.textContent = `Загрузка: ${i}%`;
    }

    output.textContent = 'Загрузка завершена успешно!';
    output.className = 'output success';
}

function createRequestCache() {
    const cache = new Map();
    return async function cachedRequest(url) {
        if (cache.has(url)) {
            console.log(`Данные взяты из кэша для: ${url}`);
            return cache.get(url);
        }
        console.log(`Запрос к API: ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        cache.set(url, data);
        return data;
    };
}

function setupRealScenarioEvents() {
    const seqBtn = document.getElementById('sequential-requests');
    const uploadBtn = document.getElementById('upload-simulation');
    const cacheBtn = document.getElementById('cache-requests');
    
    if (seqBtn) seqBtn.addEventListener('click', sequentialApiRequests);
    if (uploadBtn) uploadBtn.addEventListener('click', simulateFileUpload);
    
    if (cacheBtn) {
        const cachedRequest = createRequestCache();
        cacheBtn.addEventListener('click', async () => {
            const output = document.getElementById('scenario-output');
            if (!output) return;
            output.textContent = 'Кэширование запросов... Проверьте консоль.';
            
            try {
                const url = 'https://jsonplaceholder.typicode.com/todos/1';
                const data1 = await cachedRequest(url);
                output.textContent = `Запрос 1: ${JSON.stringify(data1)}\n`;
                
                const data2 = await cachedRequest(url);
                output.textContent += `Запрос 2 (из кэша): ${JSON.stringify(data2)}`;
                output.className = 'output success';
            } catch (e) {
                output.textContent = `Ошибка: ${e.message}`;
                output.className = 'output error';
            }
        });
    }
}

function initializeAsyncOperations() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
    console.log('Все асинхронные обработчики инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeAsyncOperations);