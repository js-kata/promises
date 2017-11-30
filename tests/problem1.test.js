/**
 * Napisz funkcję 'negation', która przyjmuje Promise'a jako argument i zwraca Promise'a, który
 * jest jego negacją, tzn. rozwiązuje się poprawnie, gdy Promise wejściowy kończy się
 * niepowodzeniem a kończy się niepowodzeniem, gdy Promise wejściowy zwraca poprawną wartość.
 * 
 * Przykładowo Promise zwracany przez
 * 
 * negation(Promise.resolve(5));
 * 
 * powinien rzucać liczbę 5 jako obiekt błędu, zaś
 * 
 * negation(Promise.reject(5));
 * 
 * powinien poprawnie zwracać liczbę 5 jako wartość.
 * 
 */

const p = require('../utils.js');

describe('problem1', () => {
    it('negates resolved promises', (done) => {
        negation(p.resolve(5))
            .catch(err => {
                expect(err).toEqual(5);
                done();
            })
    });

    it('negates rejected promises', (done) => {
        negation(p.reject(5))
            .then(err => {
                expect(err).toEqual(5);
                done();
            });
    });
});
