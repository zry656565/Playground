import {async} from '../index.js'

async.waterfall([
    function(callback) {
        console.log('first')
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
      console.log(arg1, arg2)      
      // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback) {
      console.log(arg1)
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
  console.log(result)
    // result now equals 'done'
});