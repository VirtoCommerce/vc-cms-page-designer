export class MessagesService {

    constructor(private parentOrigin: string) { }

    renderComplete() {
        this.send('render-complete');
    }

    blockHover(model) {
        this.send('hover')
    }

    selectBlock(model) {
        this.send('select')
    }

    private send(message: string) {
        window.parent.postMessage({ type: message }, this.parentOrigin);
    }
}