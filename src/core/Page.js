export class Page {
    constructor(params){
        this.params = params || Date.now().toString()
    }

    getRoot() {
        throw new Error ('Root no implimented')
    }

    afterRender() {
    }

    destroy() {
    }

}
