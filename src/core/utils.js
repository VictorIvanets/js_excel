export function capitalize (string) {
    if (typeof string !== 'string') {
        return ''
    } else {
        return string.charAt(0).toLocaleUpperCase() + string.slice(1)
    }

}