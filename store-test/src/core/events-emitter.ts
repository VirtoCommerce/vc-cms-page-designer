export class EventsEmitter {

    private events: { [key: string]: ((arg: any) => void)[] } = {};

    subscribe(eventName: string, fn: (arg: any) => void) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }

    emit(eventName: string, data: any) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }
}
