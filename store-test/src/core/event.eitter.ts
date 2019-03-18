export class EventEmitter {

    private handlers: ((arg: any) => void)[] = [];

    subscribe(fn: (arg: any) => void) {
        this.handlers.push(fn);
        return () => {
            this.handlers = this.handlers.filter(eventFn => fn !== eventFn);
        }
    }

    emit(data: any) {
        this.handlers.forEach(fn => {
            fn.call(null, data);
        });
    }
}
