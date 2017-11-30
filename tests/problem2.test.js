/**
 * Napisz funkcję 'attempt', która przymuje jako jedyny argument listę funkcji, z których
 * każda zwraca Promise'a. 'attempt' powinien wywołać pierwszą funkcję i jeśli zwrócony
 * Promise zakończył się błędem, wywołać kolejną funkcję z listy, aż któryś Promise zwróci
 * poprawny wynik. 'attempt' powinien zwrócić ten wynik i nie wywoływać już dalszych funkcji.
 * 
 * Przykładowo wywołanie:
 * 
 * attempt([
 *   () => Promise.reject(),
 *   () => Promise.resolve(2),
 *   () => Promise.resolve(3)
 * ]);
 * 
 * powinno zwrócić Promise, który rozwiąże się do wartości 2. Trzecia podana funkcja nie powinna
 * w ogóle zostać wywołana.
 * 
 * Spróbuj napisać tą funkcję zarówno z async/await jak i bez. Które rozwiązanie jest twoim zdaniem
 * czytelniejsze?
 * 
 * PYTANIE DODATKOWE: Czy wiesz, czemu 'attempt' musi przyjmować listę funkcji? Czemu nie mógłby
 * przyjmować po prostu listy Promise'ów?
 */

const p = require('../utils.js');

describe('problem2', () => {
    it('properly resolves with just one promise', async () => {
        const result = await attempt([() => p.resolve(1)]);

        expect(result).toEqual(1);
    });

    it('returns value of first promise that resolves', async () => {
        const fn3 = jest.fn();
        const result = await attempt([
            () => p.reject(),
            () => p.resolve(1),
            () => p.resolve(2) 
        ]);

        expect(result).toEqual(1);
    });

    it('does not call functions after resolved one', async () => {
        const fn3 = jest.fn();
        const result = await attempt([
            () => p.reject(),
            () => p.resolve(1),
            fn3
        ]);

        expect(fn3.mock.calls.length).toBe(0);
    });

    it('rejects with last error if all promises rejected', async (done) => {
        try {
            await attempt([
                () => p.reject(),
                () => p.reject(1),
                () => p.reject(2) 
            ]);
        } catch (e) {
            expect(e).toEqual(2);
            done();
        }
    });
});
