function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'test-success' : 'test-failure'}`;
    
    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? 'УСПЕХ' : 'ОШИБКА'}
        <br>
        Ожидалось: ${JSON.stringify(expected)}
        <br>
        Получено: ${JSON.stringify(actual)}
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(resultElement, document.getElementById('main-footer'));
    }
    console.log(`${testName}:`, isEqual ? 'УСПЕХ' : 'ОШИБКА', { expected, actual });
}

function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    createCard('Тест', 'Описание');
    const card = document.querySelector('#target1 .card');
    runTest('createCard: карточка создана', !!card, true);
    if (card) {
        runTest('createCard: заголовок', card.querySelector('h4').textContent, 'Тест');
        runTest('createCard: текст', card.querySelector('p').textContent, 'Описание');
    }

    createList(['A', 'B']);
    const list = document.querySelector('#target1 ol');
    runTest('createList: список создан', !!list, true);
    if (list) {
        runTest('createList: количество элементов', list.children.length, 2);
    }

    runTest('countChildren', countChildren(), 3);
    
    const special = findSpecialChild();
    runTest('findSpecialChild: текст', special.trim(), 'Особый дочерний элемент');

    const bg = getParentBackground();
    runTest('getParentBackground: цвет', bg, 'rgb(52, 152, 219)');

    runTest('Наличие кнопки переключения стиля', !!document.getElementById('toggle-style'), true);
    runTest('Наличие счетчика кликов', !!document.getElementById('click-btn'), true);
    runTest('Наличие инпута для списка', !!document.getElementById('item-input'), true);
    runTest('Наличие формы', !!document.getElementById('user-form'), true);

    const testFormData = new FormData();
    testFormData.append('name', 'A');
    testFormData.append('email', 'invalid');
    const errors = validateForm(testFormData);
    runTest('validateForm: ошибки при неверных данных', errors.length > 0, true);

    const testFormData2 = new FormData();
    testFormData2.append('name', 'Иван');
    testFormData2.append('email', 'ivan@test.ru');
    testFormData2.append('age', '25');
    const errors2 = validateForm(testFormData2);
    runTest('validateForm: нет ошибок при верных данных', errors2.length, 0);

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runAllTests, 100);
});