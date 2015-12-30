let _ = {
  isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]'
  }
}

export let async = {
  waterfall(tasks, doneCallback) {
    if (!_.isArray(tasks)) {
      return doneCallback && doneCallback(new Error('First argument to waterfall must be an array of functions'))
    }
    if (doneCallback) tasks.push(doneCallback)
    
    doneCallback = tasks[tasks.length - 1]

    for (let i = tasks.length - 1; i >= 0; i--) {
      (function (task, i) {
        tasks[i] = function (error, ...args) {
          if (error || !tasks[i + 1]) {
            doneCallback.apply(null, [error].concat(args))
          } else {
            args.push(tasks[i + 1])
            task.apply(null, args)
          }
        }
      } (tasks[i], i))
    }

    tasks[0].call(null)
  }
}