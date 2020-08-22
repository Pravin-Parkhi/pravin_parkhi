// Makes deep copy of object and an array
// Works only for JSON serializable content
export function deepCopy (data) {
    if (data) {
      return JSON.parse(JSON.stringify(data))
    }
}

export const transformObjectKeys = function (input, transformer) {
  if (!input || typeof input !== 'object' || !Object.keys(input).length) return input
  if (Array.isArray(input)) return input.map((value) => transformObjectKeys(value, transformer))

  return Object.keys(input).reduce(function (newObj, key) {
    const val = input[key]
    const newVal = (typeof val === 'object') ? transformObjectKeys(val, transformer) : val
    newObj[transformer(key)] = newVal
    return newObj
  }, {})
}