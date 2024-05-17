export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function renge(start, end){
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index)
}

export function matrix($target, $current) {

    const target = $target.id(true);
    const current = $current.id(true);
    const cols = renge(current.col, target.col)
    const row = renge(current.row, target.row)

    return cols.reduce((acc, col) => {
        row.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {col, row}){
    switch(key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowUp':
            row = row -1 < 0 ? 0 : row -1
            break
        case 'ArrowLeft':
            col = col -1 < 0 ? 0 : col -1
            break
    }
    return `[data-id="${row}:${col}"]`
}