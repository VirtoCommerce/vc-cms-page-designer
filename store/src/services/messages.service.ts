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

    private send(message: string, model) {
        const msg = { type: message, ...model };
        if (message !== 'hover') {
            console.log(msg);
        }
        window.parent.postMessage(msg, this.parentOrigin);
    }
}