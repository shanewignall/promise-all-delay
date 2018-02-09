function promiseAll(promises, delay) {
  return new Promise(function(resolve, reject) {
    function doPromise() {
      promises[0]()
        .then(function() {
          setTimeout(function() {
            promises.pop();

            if (promises.length) {
              doPromise();
            } else {
              return resolve();
            }
          }, delay);
        }).catch(function(err) {
          reject(err);
        });
    }
    
    doPromise();
  });
}
