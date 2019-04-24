import { MessageContent } from '../models';

export class MessagesService {

    constructor(private parentOrigin: string) { }

    renderComplete() {
        this.send('render-complete', null);
    }

    blockHover(model) {
        this.send('hover', { id: model.id });
    }

    swapBlocks(args) {
        this.send('swap', { type: 'swap', ...args });
    }

    selectBlock(model: MessageContent) {
        this.send('select', model ? { id: model.id } : null);
    }

    ping() {
        this.send('ping', null);
    }

    private send(message: string, model) {
        const msg = { type: message, ...model };
        console.log('send to designer', msg);
        window.parent.postMessage(msg, this.parentOrigin);
    }
}