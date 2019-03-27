export class EventsBus {

    private subscribers = {};

    publish(type: string, args: any, source: any) {
        if (this.subscribers[type]) {
            this.subscribers[type].forEach(handler => {
                handler(args, source);
            });
        }
    }

    subscribe(type: string, handler: (args: any, source: any) => {}) {
        if (!this.subscribers[type]) {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(handler);
        return () => {
            const index = this.subscribers[type].indexOf(handler);
            if (index !== -1) {
                this.subscribers[type].splice(index, 1);
            }
        };
    }
}
