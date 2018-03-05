# promise-all-delay
Executes an array of promises-returning functions sequentially with a specified delay and concurrency value

```javascript
/**
 * Executes an array of promises-returning functions sequentially with a specified delay and concurrency value
 * @param {array} promises - An array of promises.
 * @param {integer} delay - An amount of time to wait between each promise execution in ms.
 * @param {integer} concurrency - The max number of parallel promises
 */
 
function promiseAll(promises, delay = 0, concurrency = 1) {
  return new Promise((resolve, reject) => {
    var batches = [];
    var batch;
    
    if (concurrency === 0) {
      concurrency = 1;
    }

    while (promises.length > 0) {
      batches.push(promises.splice(0, concurrency));
    }

    function doPromise() {
      batch = batches[0];
      var promises = [];

      batch.forEach((func) => {
        promises.push(func());
      });

      Promise.all(promises).then(() => {
        setTimeout(() => {

          batches.shift();
          if (batches.length) {
            doPromise();
          } else {
            if (batches.length > 1) {
              batches.shift();

              batch = batches[0];
              doPromise();
            } else {
              return resolve();
            }
          }
        }, delay);
      }).catch((err) => {
        reject(err);
      });
    }

    doPromise();
  });
}
```
