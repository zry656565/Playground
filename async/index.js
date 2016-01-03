import {isArray, ensureAsync} from './utils.js'

export let async = {
  waterfall(tasks, doneCallback = function(){}) {
    if (!isArray(tasks)) {
      return doneCallback && doneCallback(new Error('First argument to waterfall must be an array of functions'))
    }
    
    tasks.push(doneCallback)

    for (let i = tasks.length - 1; i >= 0; i--) {
      (function (task, i) {
        tasks[i] = function (error, ...args) {
          if (error || !tasks[i + 1]) {
            doneCallback.apply(null, [error].concat(args))
          } else {
            args.push(tasks[i + 1])
            ensureAsync(task).apply(null, args)
          }
        }
      } (tasks[i], i))
    }
    
    tasks[0].call(null)
  }
}