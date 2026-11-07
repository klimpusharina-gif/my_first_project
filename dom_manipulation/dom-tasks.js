function createCard(title, content) {
    const target = document.getElementById('target1');
    if (!target) return;
    const card = document.createElement('div');
    card.className = 'card';
    const h4 = document.createElement('h4');
    h4.textContent = title;
    const p = document.createElement('p');
    p.textContent = content;
    card.appendChild(h4);
    card.appendChild(p);
    target.appendChild(card);
}

function createList(items) {
    const target = document.getElementById('target1');
    if (!target) return;
    const ol = document.createElement('ol');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });
    target.appendChild(ol);
}

function countChildren() {
    const parent = document.getElementById('parent-element');
    if (!parent) return 0;
    return parent.children.length;
}

function findSpecialChild() {
    const parent = document.getElementById('parent-element');
    if (!parent) return null;
    const special = parent.querySelector('.special');
    return special ? special.textContent : null;
}

function getParentBackground() {
    const child = document.querySelector('.child');
    if (!child || !child.parentElement) return null;
    return getComputedStyle(child.parentElement).backgroundColor;
}

function setupStyleToggle() {
    const btn = document.getElementById('toggle-style');
    const target = document.getElementById('style-target');
    if (!btn || !target) return;
    btn.addEventListener('click', () => {
        target.classList.toggle('active-style');
    });
}

function changeHeaderColor() {
    const header = document.getElementById('main-header');
    if (!header) return;
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    header.style.backgroundColor = randomColor;
}

function animateElement() {
    const target = document.getElementById('style-target');
    if (!target) return;
    target.style.transform = 'scale(1.1)';
    target.style.opacity = '0.7';
    setTimeout(() => {
        target.style.transform = 'scale(1)';
        target.style.opacity = '1';
    }, 500);
}

function setupClickCounter() {
    const btn = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    if (!btn || !counter) return;
    let count = 0;
    btn.addEventListener('click', () => {
        count++;
        counter.textContent = `Кликов: ${count}`;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    if (!input || !display) return;
    input.addEventListener('input', (e) => {
        display.textContent = e.target.value;
    });
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        console.log(`Нажата клавиша: ${e.key}, код: ${e.code}`);
    });
}

function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    if (!input || !list || !input.value.trim()) return;

    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = input.value;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', removeListItem);

    li.appendChild(deleteBtn);
    list.appendChild(li);
    input.value = '';
}

function removeListItem(event) {
    event.target.parentElement.remove();
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    if (list) list.innerHTML = '';
}

function setupListEvents() {
    const addBtn = document.getElementById('add-item');
    const clearBtn = document.getElementById('clear-list');
    if (addBtn) addBtn.addEventListener('click', addListItem);
    if (clearBtn) clearBtn.addEventListener('click', clearList);
}

function validateForm(formData) {
    const errors = [];
    const name = formData.get('name');
    const email = formData.get('email');
    const age = formData.get('age');

    if (!name || name.trim().length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Введите корректный Email');
    }
    if (age && (age < 1 || age > 120)) {
        errors.push('Возраст должен быть от 1 до 120');
    }

    return errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    if (!output) return;
    output.innerHTML = '';
    output.className = 'error-message';
    const ul = document.createElement('ul');
    errors.forEach(err => {
        const li = document.createElement('li');
        li.textContent = err;
        ul.appendChild(li);
    });
    output.appendChild(ul);
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    if (!output) return;
    output.innerHTML = `
        <h4>Успешно отправлено!</h4>
        <p>Имя: ${userData.name}</p>
        <p>Email: ${userData.email}</p>
        <p>Возраст: ${userData.age || 'не указан'}</p>
    `;
    output.className = 'success-message';
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const dataObj = {
        name: formData.get('name'),
        email: formData.get('email'),
        age: formData.get('age')
    };

    const errors = validateForm(formData);

    if (errors.length > 0) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(dataObj);
        form.reset();
    }
}

function setupForm() {
    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function initializeApp() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();
    
    createCard('Пример карточки', 'Это содержимое карточки');
    createList(['Первый элемент', 'Второй элемент', 'Третий элемент']);
    console.log('Приложение инициализировано!');
}

document.addEventListener('DOMContentLoaded', initializeApp);