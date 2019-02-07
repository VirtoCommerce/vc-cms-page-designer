import { BlockEventListener } from './block.event-listener';
import { BlockModel } from './models';

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

    constructor(model: BlockModel) {
        this.model = model;
    }

    fromHtml(html: string) {
        this.html = html;
        this.createElement();
    }

    remove() {
        if (!!this.element) {
            this.eventListener = null;
            this.element.remove();
        }
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
