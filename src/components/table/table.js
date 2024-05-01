import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.temp";

export class Table extends ExcelComponent {
    static className = 'table'


    toHTML(){
        return createTable(20)
    }
    
}