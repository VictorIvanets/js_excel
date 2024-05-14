
function toButton(button) {
    const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
    `


    return `
    <button 
    ${meta}
    class="toolbar__btn ${button.active ? 'active' : ''}">
    <i ${meta} class="material-icons">${button.icon}</i>
    </button>`
}


export function createToolbar(state){
    const buttons = [
        {
        icon: 'format_align_left',
        active: state['textAlign'] === 'left',
        value: {textAlign: 'left'}
        },
        {
        icon: 'format_align_center',
        active: state['textAlign'] === 'center',
        value: {textAlign: 'center'}
        },
        {
        icon: 'format_align_rightt',
        active:  state['textAlign'] === 'right',
        value: {textAlign: 'right'}
        },
        {
        icon: 'format_bold',
        active: state['fontWeight'] === 'bold',
        value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal':'bold'}
        },
        {
        icon: 'format_italic',
        active: state['fontStyle'] === 'italic',
        value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal':'italic'}
        },
        {
        icon: 'format_underlined',
        active: state['textDecoration'] === 'underline',
        value: {textDecoration: state['textDecoration'] === 'underline' ? 'none':'underline'}
        }
    ]

    return buttons.map(btn => toButton(btn)).join('')
}



// ` 
//     <button class="toolbar__btn">
//         <i class="material-icons">format_align_left</i>
//     </button>
//     <button class="toolbar__btn">
//         <i class="material-icons">format_align_center</i>
//     </button>
//     <button class="toolbar__btn">
//         <i class="material-icons">format_align_rightt</i>
//     </button>
//     <button class="toolbar__btn">
//         <i class="material-icons">format_bold</i>
//     </button>
//     <button class="toolbar__btn">
//         <i class="material-icons">format_italic</i>
//     </button>
//     <button class="toolbar__btn">
//         <i class="material-icons">format_underlined</i>
//     </button>
//     `