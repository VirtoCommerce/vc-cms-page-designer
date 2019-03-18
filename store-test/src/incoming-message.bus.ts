import { EventsEmitter } from './core/events-emitter';

export class IncomingMessageBus {

    message = new EventsEmitter();

    constructor() {
        this.init();
    }

    private init() {
        window.addEventListener('message', (event: MessageEvent) => {
            if (event.data && event.data.type) {
                this.message.emit(event.data.type, event.data.content);
            }
        });
    }
}
