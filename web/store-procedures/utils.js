Object.isObject = item => typeof item === 'object' && !Array.isArray(item)

Object.merge = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()
  if (Object.isObject(target) && Object.isObject(source)) {
    for (const key in source) {
      if (Object.isObject(source[key])) {
        !target[key] && Object.assign(target, { [key]: {} })
        Object.merge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return Object.merge(target, ...sources)
}
