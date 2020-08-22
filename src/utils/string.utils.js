export function snakeToCamel (s) {
    return s.replace(/(_\w)/g, function (m) { return m[1].toUpperCase() })
}

export function camelToSnake (s) {
    return s.replace(/([A-Z])/g, function (m) { return '_' + m[0].toLowerCase() })
}

export function convertToLowerCase (string) {
    return string ? String(string).toLowerCase() : ''
}