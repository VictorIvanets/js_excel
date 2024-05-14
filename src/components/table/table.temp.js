// import { defaultStyles } from "../../constants"
import { defaultStyles } from "../../constants"
import {toInlineStyles} from "../../core/utils"
import {parse} from "../../core/parse"


const CODES = {
    A: 65,
    Z: 90
}


const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 30



function getWidth(state, index){ 
        return (state[index] || DEFAULT_WIDTH) + 'px'
}


function getHeigth(state, index){ 
        return (state[index] || DEFAULT_HEIGHT) + 'px'
}


function toCell(state, row){
return function(_, col){
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles(
        {...defaultStyles,
        ...state.stylesState[id]})
    return `
        <div 
        class="table__row__cell" 
        contenteditable="" 
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value ="${data || ''}"
        style="${styles}; width: ${width}"
        
        > ${parse(data) || ''}</div>`
    }}



function toColumn({col, index, width}){
    return `<div 
    class="table__row__colum" 
    style="width: ${width}" 
    data-type="resizeble" 
    data-col="${index}">${col}

    <div class="col-resize" data-resize="col"></div> 
    </div>`
}



function createRow(content, index, state){
const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
const height = getHeigth(state, index)
return `<div 
            class="table__row" 
            data-type="resizeble"
            data-row="${index}"
            style = "height: ${height}"
            >
            <div class="table__row-info">
            ${(index === null ? '' : index)}
            ${resize}
            </div>
            <div class="table__row-data">${content}</div>
        </div>`
}


function toChar(_, index){
    return String.fromCharCode(CODES.A + index)
}



function withWidthFrom(state){
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 25, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
         .fill('')
         .map(toChar)
         .map(withWidthFrom(state))
         .map(toColumn)
         .join('')
  

    rows.push(createRow(cols, null, {}))
    for (let i = 0; i < rowsCount; i++){
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, i))
        .join('')
    rows.push(createRow(cells, i+1, state.rowState))
    }

    return rows.join('')
}


