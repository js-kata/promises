/* 
    Napisz funkcję takeFirst(count, ...promises).

    Ma ona zwrócić Promise z tablicą wyników ${count} najszybciej rozwiązanych Promisów. 
    Jeśli żaden Promise nie zostanie podany, wynikiem powinna być pusta tablica.
    W przypadku błędu któregoś z nich (jeśli wymagana liczba Promisów jeszcze się nie rozwiązała), 
    to powinna zwrócić odrzucony Promise z odpowiednim błędem.
    
    Przykład:

    const p1 = p.resolveWith(5).after(5) // resolves in 5 sec.
    const p2 = p.resolveWith(3).after(3) // resolves in 3 sec.
    const p3 = p.resolveWith(2).after(2) // resolves in 2 sec.
    const p4 = p.resolveWith(6).after(6) // resolves in 6 sec.
    const r1 = p.rejectWith(4).after(4) // rejects in 4 sec. 

    takeFirst(2, p1, p2, p3, p4, r1).then(console.log) // [p3, p2, p1]

    takeFirst(2, p1, p4, r1).catch(console.log) // error thrown by r1

*/

const p = require('../utils.js');

describe('problem4', () => {
    it('resolves with an array of as many elements as first argument specifies', async () => {
        const result = await takeFirst(
            2,
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3),
        );

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(2);
    });

    it('resolves with an empty array if no promises have been passed', async () => {
        expect(await takeFirst(3)).toEqual([]);
    });

    it('resolves with given number of first resolved promises', async () => {
        const promise1 = p.resolveWith(5).after(5);
        const promise2 = p.resolveWith(7).after(7);
        const promise3 = p.resolveWith(8).after(8);
        const promise4 = p.resolveWith(10).after(10);

        expect(
            await takeFirst(2, promise1, promise3, promise4, promise2),
        ).toEqual([5, 7]);
        expect(
            await takeFirst(3, promise1, promise3, promise4, promise2),
        ).toEqual([5, 7, 8]);
    });

    it('rejects if one of the promises rejects before given number of them has been resolved', async () => {
        const promise1 = p.resolveWith(5).after(5);
        const promise2 = p.resolveWith(7).after(7);
        const rejectedPromise = p.rejectWith('boom').after(1);

        expect.assertions(1);

        try {
            await takeFirst(2, promise1, promise2, rejectedPromise);
        } catch (err) {
            expect(err).toBe('boom');
        }
    });

    it("doesn't reject if a promise rejects after given number of them has been resolved", async () => {
        const promise1 = p.resolveWith(5).after(5);
        const promise2 = p.resolveWith(7).after(7);
        const promise3 = p.resolveWith(8).after(8);
        const rejectedPromise = p.rejectWith().after(10);

        expect.assertions(1);

        expect(
            await takeFirst(
                3,
                promise1,
                promise2,
                promise3,
                rejectedPromise,
            ),
        ).toEqual([5, 7, 8]);
    });
});


function takeFirst(count, ...promises) {

    return promises[0]
        .catch(e => promises.length > 1 ? takeFirst(promises.slice(1)) : Promise.reject([e]));

}
