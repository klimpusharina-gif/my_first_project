function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'success' : 'error'}`;

    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? 'УСПЕХ' : 'ОШИБКА'}
        <br>
        Ожидалось: ${JSON.stringify(expected)}
        <br>
        Получено: ${JSON.stringify(actual)}
    `;

    document.getElementById('testResults').appendChild(resultElement);
    console.log(`${testName}:`, isEqual ? 'УСПЕХ' : 'ОШИБКА', { expected, actual });
}

function runAllTests() {
    console.log('=== ЗАПУСК ТЕСТОВ ===');

    runTest('sum(1, 2, 3, 4)', sum(1, 2, 3, 4), 10);
    runTest('sum()', sum(), 0);
    runTest('sum(-5, 5, 10)', sum(-5, 5, 10), 10);

    runTest('createUser({name: "Ivan", age: 25})', createUser({name: "Ivan", age: 25}), "Пользователь: Ivan, возраст: 25, email: не указан");
    runTest('createUser({name: "Anna", age: 30, email: "a@mail.ru"})', createUser({name: "Anna", age: 30, email: "a@mail.ru"}), "Пользователь: Anna, возраст: 30, email: a@mail.ru");

    const getSecret = secretMessage("123", "Секрет");
    runTest('getSecret("123")', getSecret("123"), "Секрет");
    runTest('getSecret("321")', getSecret("321"), "Доступ запрещен");

    const add5 = x => x + 5;
    const multiply2 = x => x * 2;
    const composed = compose(add5, multiply2);
    runTest('compose(add5, multiply2)(10)', composed(10), 25);

    runTest('myMap([1, 2, 3], x => x * 2)', myMap([1, 2, 3], x => x * 2), [2, 4, 6]);
    runTest('myMap([], x => x)', myMap([], x => x), []);

    runTest('myFilter([1, 2, 3, 4], x => x % 2 === 0)', myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);
    runTest('myFilter([1, 2, 3], x => x > 5)', myFilter([1, 2, 3], x => x > 5), []);

    runTest('myReduce([1, 2, 3], (a, b) => a + b, 0)', myReduce([1, 2, 3], (a, b) => a + b, 0), 6);
    runTest('myReduce([1, 2, 3], (a, b) => a + b)', myReduce([1, 2, 3], (a, b) => a + b), 6);
    
    try {
        myReduce([], (a, b) => a + b);
        runTest('myReduce([], ...) should throw', 'no error', 'error');
    } catch (e) {
        runTest('myReduce([], ...) throws TypeError', e instanceof TypeError, true);
    }

    function addThree(a, b, c) { return a + b + c; }
    const curriedAdd = curry(addThree);
    runTest('curry(addThree)(1)(2)(3)', curriedAdd(1)(2)(3), 6);
    runTest('curry(addThree)(1, 2)(3)', curriedAdd(1, 2)(3), 6);

    let callCount = 0;
    const slowFn = (x) => { callCount++; return x * 2; };
    const memoizedFn = memoize(slowFn);
    memoizedFn(10);
    memoizedFn(10);
    runTest('memoize: call count', callCount, 1);

    let executeCount = 0;
    const testFn = () => executeCount++;
    const throttled = throttle(testFn, 100);
    throttled();
    throttled();
    runTest('throttle: call count', executeCount, 1);

    const validatePassword = createValidator({ minLength: 8, requireDigit: true, requireUppercase: true });
    runTest('validate("pass")', validatePassword("pass").isValid, false);
    runTest('validate("password")', validatePassword("password").isValid, false);
    runTest('validate("Password1")', validatePassword("Password1").isValid, true);

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
}

document.addEventListener('DOMContentLoaded', function() {
    runAllTests();
});