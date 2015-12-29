let _ = {
  isArray(obj) {
    return Object.prototype.toString(obj) == '[object Array]'
  }
}

export let async = {
  waterfall(tasks, doneCallback) {
    if (_.isArray(tasks)) return null
    if (doneCallback) tasks.push(doneCallback)
    
    doneCallback = tasks[tasks.length - 1]
    
    tasks.map(function(task, i, tasks) {
      return function(error, ...args) {
        console.log(args)
        if (error) {
          doneCallback(error)
        } else {
          args.push(tasks[i + 1])
          task.apply(null, args)
        }
      }
    })
    
    console.log(tasks[0].toString())
    
    tasks[0].call(null)
  }
}