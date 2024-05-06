const CODES = {
    A: 65,
    Z: 90
}


// function toCell(_, col){
// return `
//     <div class="table__row__cell" contenteditable="" data-col="${col}"></div>

// `
// }

function toCell(row){
return function(_, col){
    return `
        <div 
        class="table__row__cell" 
        contenteditable="" 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}">
        </div>
    `
}

    }



function toColumn(col, index){
    return `<div class="table__row__colum" data-type="resizeble" data-col="${index}">${col}
    <div class="col-resize" data-resize="col"></div> 
    </div>`
}



function createRow(content, index){
const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
return `<div class="table__row" data-type="resizeble">
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


export function createTable(rowsCount = 25) {

    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
         .fill('')
         .map(toChar)
         .map(toColumn)
         .join('')
  

    rows.push(createRow(cols, null))
    for (let i = 0; i < rowsCount; i++){
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i))
        .join('')
    rows.push(createRow(cells, i+1))
    }

    return rows.join('')
}
 


{/* <div class="table__row">

<div class="table__row-info">
</div>

<div class="table__row-data">
        <div class="table__row__colum">A</div>
</div>

</div>


<div class="table__row">
<div class="table__row-info">1</div>
<div class="table__row-data">

        <div class="table__row__cell" contenteditable=""></div>
        <div class="table__row__cell" contenteditable=""></div>
        <div class="table__row__cell" contenteditable=""></div>
</div>
</div> */}

