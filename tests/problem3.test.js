/**
 * Stwórz funkcję 'first', która przyjmuje tablicę Promise'ów jako argument
 * i zwraca wartość pierwszego poprawnie wykonanego Promise'a, a w przypadku
 * gdy żaden z Promise'ów się nie powiedzie, zwróci tablicę z błędami.
 * 
 * Jeśli więc jeden z Promise'ów rozwiąże się poprawnie, a inny rzuci błędem,
 * 'first' powinien zignorować ten, który rzucił błędem i rozwiązać się do 
 * wartości zwróconej przez poprawnie rozwiązany p.
 *
 * Przykładowo:
 *
 * const p1 = resolveInSec(5) // resolves in 5 sec.
 * const p2 = resolveInSec(3) // resolves in 3 sec.
 * const p3 = rejectInSec(4)  // rejects  in 4 sec.
 * const p4 = rejectInSec(2)  // rejects  in 2 sec.
 *
 * first([p1, p2, p3, p4]).then((value) => {
 *      console.log(value); // loguje 3 (wartość zwróconą przez p2)
 * });
 * 
 * first([p3, p4]).catch(err => {
 *      console.log(err); // loguje listę [4, 3] (błędy rzucone kolejno przez p3 i p4)
 * });
 */
const p = require('../utils.js');

describe('problem3', () => {
    it('resolves to first resolved value', async () => {
        const result = await first([p.resolve(1)(1000), p.resolve(5)(2000)]);

        expect(result).toEqual(1);
    });

    it('resolves to first resolved value, even if other throw', async () => {
        const result = await first([p.reject()(), p.resolve(5)(1000), p.resolve(10)(5000)]);

        expect(result).toEqual(5);
    });

    it('throws array of errors', (done) => {
        first([p.reject(1)(), p.reject(2)(), p.reject(3)()])
            .catch(e => {
                expect(e).toEqual([1, 2, 3]);
                done();
            });
    });
});