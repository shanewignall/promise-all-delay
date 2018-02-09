/**
 * Executes an array of promises sequentially with a specified delay
 * @param {array} promises - An array of promises.
 * @param {integer} delay - An amount of time to wait between each promise execution in ms.
 */
function promiseAll(promises, delay) {
  return new Promise((resolve, reject) => {
    function doPromise() {
      promises[0]()
        .then(() => {
          setTimeout(() => {
            promises.pop();

            if (promises.length) {
              doPromise();
            } else {
              return resolve();
            }
          }, delay);
        }).catch((err) => {
          reject(err);
        });
    }
    
    doPromise();
  });
}
