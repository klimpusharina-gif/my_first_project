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

async function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    runTest('Наличие кнопки #basic-promise', !!document.getElementById('basic-promise'), true);
    runTest('Наличие кнопки #fetch-users', !!document.getElementById('fetch-users'), true);
    runTest('Наличие блока #promise-output', !!document.getElementById('promise-output'), true);
    runTest('Наличие блока #async-output', !!document.getElementById('async-output'), true);
    runTest('Наличие контейнера #api-data', !!document.getElementById('api-data'), true);

    try {
        const res = await createBasicPromise(true);
        runTest('createBasicPromise(true) резолвится', res, 'Успех!');
    } catch (e) {
        runTest('createBasicPromise(true) резолвится', e, 'Успех!');
    }

    try {
        await createBasicPromise(false);
        runTest('createBasicPromise(false) реджектится', 'Нет ошибки', 'Ошибка!');
    } catch (e) {
        runTest('createBasicPromise(false) реджектится', e, 'Ошибка!');
    }

    const start = Date.now();
    await new Promise(r => setTimeout(r, 100));
    runTest('Задержка setTimeout', Date.now() - start >= 100, true);

    const cacheFn = createRequestCache();
    runTest('Тип createRequestCache', typeof cacheFn, 'function');

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runAllTests, 200);
});