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

    runTest('Наличие кнопки #basic-btn', !!document.getElementById('basic-btn'), true);
    runTest('Наличие блока #basic-output', !!document.getElementById('basic-output'), true);
    runTest('Наличие поля #color-box', !!document.getElementById('color-box'), true);
    runTest('Наличие input #key-input', !!document.getElementById('key-input'), true);
    runTest('Наличие списка #item-list', !!document.getElementById('item-list'), true);
    runTest('Наличие ссылки #prevent-link', !!document.getElementById('prevent-link'), true);
    runTest('Наличие формы #prevent-form', !!document.getElementById('prevent-form'), true);
    runTest('Наличие кнопки #trigger-custom', !!document.getElementById('trigger-custom'), true);
    runTest('Наличие контейнера #image-container', !!document.getElementById('image-container'), true);
    runTest('Наличие кнопки #start-timer', !!document.getElementById('start-timer'), true);

    const testEvent = new CustomEvent('testEvent', { detail: { value: 123 } });
    document.dispatchEvent(testEvent);
    runTest('Создание CustomEvent', testEvent.detail.value, 123);

    const debounceFn = createDebounce(() => {}, 100);
    runTest('Тип результата createDebounce', typeof debounceFn, 'function');

    const throttleFn = createThrottle(() => {}, 100);
    runTest('Тип результата createThrottle', typeof throttleFn, 'function');

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runAllTests, 200);
});