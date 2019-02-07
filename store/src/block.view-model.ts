import { BlockEventListener } from './block.event-listener';
import { HttpService } from './services/http.service';
import { BlockModel } from './models';
import { View } from './view';

export class BlockViewModel {
    private _model: BlockModel;
    html: string;
    element: HTMLElement;

    get model() {
        return this._model;
    }

    set model(value: BlockModel) {
        if (this._model != value) {
            this._model = value;
            this.html = null
        }
    }

    eventListener: BlockEventListener;

    private hoverListener = () => this.eventListener.elementHover(this);

    constructor(model: BlockModel, private http: HttpService) {
        this.model = model;
    }

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

    highlight() {
    }

    unlight() {

    }

    render(view: View, index: number, force: boolean = false): Promise<BlockViewModel> {
        // TODO: add element to view
        if (force || !this.element) {
            return this.http.post(this.model).then(html => {
                this.fromHtml(html);
                view.setElement(index, this.element);
                return this;
            });
        }
        return Promise.resolve(this);
    }

    private createElement() {
        if (this.element) {
            this.element.removeEventListener('mouseover', this.hoverListener);
            this.element.remove();
        }
        const div = document.createElement('div');
        div.innerHTML = this.html;
        const result = <HTMLElement>div.firstChild;
        result.addEventListener('mouseover', this.hoverListener);
        // TODO: add events
        //      hover
        //      mouse up
        //      mouse down
        //      mouse move
        this.element = result;
    }

}
