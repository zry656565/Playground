export let isArray = obj => Object.prototype.toString.call(obj) == '[object Array]'
export let setImmediate = fn => setTimeout(fn, 0)
export let ensureAsync = fn => {
  return function(...args) {
    let needSync = true
    let callback = args.pop()
    args.push((...innerArgs) => {
      if (needSync) {
        setImmediate(() => callback.apply(this, innerArgs))
      } else {
        callback.apply(this, innerArgs)
      }
    })
    fn.apply(this, args)
    needSync = false
  }
}