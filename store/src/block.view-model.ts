import { BlockEventListener } from './block.event-listener';
import { HttpService } from './services/http.service';
import { BlockModel } from './models';
import { View } from './view';

export class BlockViewModel {
    index: number = null;
    html: string;
    element: HTMLElement;

    eventListener: BlockEventListener;

    constructor(public model: BlockModel, private http: HttpService) { }

    fromHtml(html: string) {
        this.html = html;
        this.createElement();
    }

    select() {
        // TODO: set element properties
    }

    deselect() {
        // TODO: set element properties
    }

    remove() {
        if (!!this.element) {
            this.eventListener = null;
            this.element.remove();
        }
    }

    render(view: View, index: number, force: boolean = false): Promise<BlockViewModel> {
        // TODO: add element to view
        return new Promise<BlockViewModel>((reject, resolve) => {
            if (force || !this.element) {
                return this.http.post(this.model).then(html => {
                    this.fromHtml(html);
                    view.setElement(index, this.element);
                    return this;
                });
            }
            resolve(this);
        });
    }

    private createElement() {
        const div = document.createElement('div');
        div.innerHTML = this.html;
        const result = <HTMLElement>div.firstChild;
        // TODO: add events
        //      hover
        //      mouse up
        //      mouse down
        //      mouse move
        this.element = result;
    }
}
