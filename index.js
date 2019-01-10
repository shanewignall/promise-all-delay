/**
 * Executes an array of promise-returning functions
 * sequentially
 * 
 * @param {Function[]} list 
 *      Array of promise-returning functions
 */
function pSeries(list) {
    let p = Promise.resolve();

    return list.reduce((acc, curr) => {
        return acc = acc.then(curr).catch(curr);
    }, p);
}

export default {
    pSeries
}
