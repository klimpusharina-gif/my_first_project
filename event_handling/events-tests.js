function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    if (!output) return;
    
    output.textContent = `Тип: ${event.type}, Координаты: (${event.clientX}, ${event.clientY}), Цель: ${event.target.tagName}`;
    
    const btn = event.target;
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 500);
}

function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');
    if (!box || !output) return;

    if (event.type === 'mouseenter') {
        box.style.background = '#e74c3c';
    } else if (event.type === 'mouseleave') {
        box.style.background = '#3498db';
    } else if (event.type === 'mousemove') {
        output.textContent = `Координаты мыши: X: ${event.clientX}, Y: ${event.clientY}`;
    }
}

function setupBasicEvents() {
    const btn = document.getElementById('basic-btn');
    const box = document.getElementById('color-box');
    
    if (btn) btn.addEventListener('click', handleBasicClick);
    if (box) {
        box.addEventListener('mouseenter', handleMouseEvents);
        box.addEventListener('mouseleave', handleMouseEvents);
        box.addEventListener('mousemove', handleMouseEvents);
    }
}

function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    if (!output) return;

    output.textContent = `Клавиша: ${event.key}, Код: ${event.code}, Ctrl: ${event.ctrlKey}, Alt: ${event.altKey}, Shift: ${event.shiftKey}`;

    if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault();
        output.textContent += ' | Сохранение отменено';
    }
    if (event.altKey && event.code === 'KeyC') {
        event.preventDefault();
        output.textContent += ' | Копирование отменено';
    }
    if (event.shiftKey && event.code === 'KeyA') {
        event.preventDefault();
        output.textContent += ' | Выделение отменено';
    }
}

function setupKeyboardEvents() {
    const input = document.getElementById('key-input');
    if (input) {
        input.addEventListener('keydown', handleKeyEvents);
        input.addEventListener('keyup', () => {
            const output = document.getElementById('key-output');
            if (output) output.textContent = 'Клавиша отпущена';
        });
    }
}

function handleDelegationClick(event) {
    const itemList = document.getElementById('item-list');
    const output = document.getElementById('delegation-output');
    if (!itemList || !output) return;

    if (event.target.classList.contains('delete')) {
        event.target.closest('.item').remove();
    } else if (event.target.classList.contains('item')) {
        event.target.classList.toggle('selected');
    }

    const selectedCount = itemList.querySelectorAll('.item.selected').length;
    output.textContent = `Выбрано элементов: ${selectedCount}`;
}

let nextItemId = 3;

function addNewItem() {
    const list = document.getElementById('item-list');
    if (!list) return;

    const li = document.createElement('li');
    li.className = 'item';
    li.dataset.id = nextItemId++;
    li.innerHTML = `Элемент ${nextItemId - 1} <span class="delete">×</span>`;
    list.appendChild(li);
}

function setupDelegationEvents() {
    const list = document.getElementById('item-list');
    const addBtn = document.getElementById('add-item-btn');
    
    if (list) list.addEventListener('click', handleDelegationClick);
    if (addBtn) addBtn.addEventListener('click', addNewItem);
}

function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    if (output) output.textContent = 'Переход по ссылке отменен';
    
    const link = event.target;
    link.classList.add('shake');
    setTimeout(() => link.classList.remove('shake'), 300);
}

function preventFormSubmit(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    const input = document.getElementById('prevent-input');
    
    if (!output || !input) return;

    if (input.value.trim() === '') {
        output.textContent = 'Ошибка: поле не может быть пустым';
        output.className = 'output error';
    } else {
        output.textContent = `Форма отправлена. Данные: ${input.value}`;
        output.className = 'output success';
        input.value = '';
    }
}

function setupPreventionEvents() {
    const link = document.getElementById('prevent-link');
    const form = document.getElementById('prevent-form');
    
    if (link) link.addEventListener('click', preventLinkDefault);
    if (form) form.addEventListener('submit', preventFormSubmit);
}

function triggerCustomEvent() {
    const event = new CustomEvent('customAction', {
        detail: { message: 'Привет от кастомного события!' }
    });
    document.dispatchEvent(event);
}

function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    if (output) output.textContent = `Получено: ${event.detail.message}`;
}

function setupMultipleListeners() {
    document.addEventListener('customAction', () => {
        const output = document.getElementById('custom-output');
        if (output) output.textContent += ' | Обработчик 1';
    });
    document.addEventListener('customAction', () => {
        const output = document.getElementById('custom-output');
        if (output) output.textContent += ' | Обработчик 2';
    });
    document.addEventListener('customAction', () => {
        const output = document.getElementById('custom-output');
        if (output) output.textContent += ' | Обработчик 3';
    });
}

function setupCustomEvents() {
    const triggerBtn = document.getElementById('trigger-custom');
    const multipleBtn = document.getElementById('multiple-listeners');
    
    document.addEventListener('customAction', handleCustomEvent);
    if (triggerBtn) triggerBtn.addEventListener('click', triggerCustomEvent);
    if (multipleBtn) multipleBtn.addEventListener('click', setupMultipleListeners);
}

function loadImageWithEvents() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    if (!container || !output) return;

    container.innerHTML = '';
    container.className = 'image-container loading';
    output.textContent = 'Статус загрузки: загрузка...';

    const img = new Image();
    img.src = 'https://picsum.photos/300/200';
    
    img.addEventListener('loadstart', () => {
        output.textContent = 'Статус загрузки: загрузка началась';
    });
    img.addEventListener('load', () => {
        container.className = 'image-container success';
        output.textContent = 'Статус загрузки: изображение загружено';
        container.appendChild(img);
    });
    img.addEventListener('error', () => {
        container.className = 'image-container error';
        output.textContent = 'Статус загрузки: ошибка загрузки';
    });
    img.addEventListener('loadend', () => {
        console.log('Загрузка завершена (успех или ошибка)');
    });
}

function simulateLoadError() {
    const container = document.getElementById('image-container');
    const output = document.getElementById('loading-output');
    if (!container || !output) return;

    container.innerHTML = '';
    container.className = 'image-container loading';
    output.textContent = 'Статус загрузки: попытка загрузить несуществующее изображение...';

    const img = new Image();
    img.src = 'https://example.com/nonexistent-image.jpg';
    
    img.addEventListener('error', () => {
        container.className = 'image-container error';
        output.textContent = 'Статус загрузки: ошибка 404 (изображение не найдено)';
    });
}

function setupLoadingEvents() {
    const loadBtn = document.getElementById('load-image');
    const errorBtn = document.getElementById('load-error');
    
    if (loadBtn) loadBtn.addEventListener('click', loadImageWithEvents);
    if (errorBtn) errorBtn.addEventListener('click', simulateLoadError);
}

let timerInterval;
let timerValue = 0;

function startTimer() {
    const output = document.getElementById('timer-output');
    if (!output || timerInterval) return;

    timerValue = 0;
    output.textContent = `Таймер: ${timerValue}с`;
    
    timerInterval = setInterval(() => {
        timerValue++;
        output.textContent = `Таймер: ${timerValue}с`;
    }, 1000);
}

function stopTimer() {
    const output = document.getElementById('timer-output');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerValue = 0;
    if (output) output.textContent = 'Таймер остановлен и сброшен';
}

function createDebounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function createThrottle(func, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

function testDebounce() {
    const output = document.getElementById('async-output');
    if (!output) return;

    const log = (msg) => {
        output.textContent = `Асинхронные события: ${msg}`;
    };

    const debouncedLog = createDebounce((msg) => log(`Debounce: ${msg}`), 1000);
    
    log('Обычный вызов');
    debouncedLog('Вызов 1 (отменен)');
    debouncedLog('Вызов 2 (отменен)');
    debouncedLog('Вызов 3 (выполнится через 1с)');
}

function testThrottle() {
    const output = document.getElementById('async-output');
    if (!output) return;

    const log = (msg) => {
        output.textContent = `Асинхронные события: ${msg}`;
    };

    const throttledLog = createThrottle((msg) => log(`Throttle: ${msg}`), 1000);
    
    log('Быстрые клики');
    throttledLog('Клик 1 (выполнится)');
    throttledLog('Клик 2 (пропущен)');
    throttledLog('Клик 3 (пропущен)');
}

function setupTimerEvents() {
    const startBtn = document.getElementById('start-timer');
    const stopBtn = document.getElementById('stop-timer');
    const debounceBtn = document.getElementById('debounce-btn');
    const throttleBtn = document.getElementById('throttle-btn');
    
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (stopBtn) stopBtn.addEventListener('click', stopTimer);
    if (debounceBtn) debounceBtn.addEventListener('click', testDebounce);
    if (throttleBtn) throttleBtn.addEventListener('click', testThrottle);
}

function initializeEventHandler() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();
    console.log('Все обработчики событий инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeEventHandler);