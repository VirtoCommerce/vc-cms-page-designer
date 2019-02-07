import { BlockViewModel } from './block.view-model';

export class View {

    private highlightDiv: HTMLElement;
    private selectDiv: HTMLElement;

    constructor(private container: HTMLElement) {
        this.highlightDiv = this.createShadowElement();
        this.selectDiv = this.createShadowElement();
        document.body.appendChild(this.highlightDiv);
        document.body.appendChild(this.selectDiv);
    }

    highlight(model: BlockViewModel) {
        const rect = this.measureElement(model.element);
        this.highlightDiv.style.top = rect.top + 'px';
        this.highlightDiv.style.left = rect.left + 'px';
        this.highlightDiv.style.height = rect.height + 'px';
        this.highlightDiv.style.width = rect.width + 'px';
        this.highlightDiv.style.display = 'block';
        this.highlightDiv.style.backgroundColor = 'red';
        console.dir(rect);
    }

    unlight(model: BlockViewModel) {
        this.highlightDiv.style.display = 'none';
    }

    select(model: BlockViewModel) {
        // TODO: set element properties
    }

    deselect(model: BlockViewModel) {
        // TODO: set element properties
    }

    setElement(index: number, model: BlockViewModel) {
        const element = model.element;
        if (this.container.children.length > index) {
            const currentElement = this.container.children.item(index);
            if (currentElement != element) {
                currentElement.replaceWith(element);
            }
        } else {
            this.container.appendChild(element);
        }
    }

    private createShadowElement() {
        const result = document.createElement('div');
        result.style.position = 'absolute';
        result.style.display = 'none';
        return result;
    }

    private measureElement(element): { top?: number, left?: number, height?: number, width?: number } {
        var target = element,
            target_width = target.offsetWidth,
            target_height = target.offsetHeight,
            target_left = target.offsetLeft,
            target_top = target.offsetTop,
            gleft = 0,
            gtop = 0,
            rect = {};

        var moonwalk = function (_parent) {
            if (!!_parent) {
                gleft += _parent.offsetLeft;
                gtop += _parent.offsetTop;
                moonwalk(_parent.offsetParent);
            } else {
                return rect = {
                    top: target.offsetTop + gtop,
                    left: target.offsetLeft + gleft,
                    height: target_height,
                    width: target_width
                };
            }
        };
        moonwalk(target.offsetParent);
        return rect;
    }

}