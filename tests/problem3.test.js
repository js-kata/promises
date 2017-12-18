/**
 * Stwórz funkcję 'first', która przyjmuje tablicę Promise'ów jako argument
 * i zwraca wartość pierwszego poprawnie wykonanego Promise'a, a w przypadku
 * gdy żaden z Promise'ów się nie powiedzie, zwróci tablicę z błędami.
 *
 * Jeśli więc jeden z Promise'ów rozwiąże się poprawnie, a inny rzuci błędem,
 * 'first' powinien zignorować ten, który rzucił błędem i rozwiązać się do
 * wartości zwróconej przez poprawnie rozwiązany Promise.
 *
 * Przykładowo:
 *
 * const p1 = p.resolveWith(1).after(5000) // resolves in 5 sec.
 * const p2 = p.resolveWith(2).after(3000) // resolves in 3 sec.
 * const p3 = p.rejectWith(3).after(4000)  // rejects  in 4 sec.
 * const p4 = p.rejectWith(4).after(2000)  // rejects  in 2 sec.
 *
 * first([p1, p2, p3, p4]).then((value) => {
 *      console.log(value); // loguje 2 (wartość zwróconą przez p2)
 * });
 *
 * first([p3, p4]).catch(err => {
 *      console.log(err); // loguje listę [4, 3] (błędy rzucone kolejno przez p3 i p4)
 * });
 */

const p = require('../utils.js');

function negation(toNegate) {
    return toNegate.then(function(resolved) {
        return Promise.reject(resolved);
    }, function(rejected) {
        return Promise.resolve(rejected);
    })
}

async function first(promises) {
    let errors = [];
    const negated = promises.map(prom => negation(prom));
    return Promise.all(negated).then(function(values) {
        throw values;
    }, function(ex) {
        return ex;
    });
    /*
        promises.forEach(prom =>
            prom
            .then(function(value) {
                resolved.push(value);
            })
            .catch(function(ex) {
                errors.push(ex);
            }));
        return resolved.length > 0 ? resolved[0] : errors;*/
}

describe('problem3', () => {
    it('resolves to first resolved value', async() => {
        const result = await first([
            p.resolveWith(1).after(50),
            p.resolveWith(5).after(10)
        ]);

        expect(result).toEqual(5);
    });

    it('resolves to first resolved value, even if other throw', async() => {
        const result = await first([
            p.rejectWith(1).after(10),
            p.resolveWith(5).after(100),
            p.resolveWith(10).after(50)
        ]);

        expect(result).toEqual(10);
    });

    it('throws array of errors if all promises throw', (done) => {
        first([
            p.rejectWith(1).after(10),
            p.rejectWith(2).after(50),
            p.rejectWith(3).after(100)
        ]).catch(e => {
            expect(e).toEqual([1, 2, 3]);
            done();
        });
    });
});