export class Page {
    constructor(params){
        this.params = params
    }

    getRoot() {
        throw new Error ('Root no implimented')
    }

    afterRender() {
    }

    destroy() {
    }

}
