import { BlockViewModel } from './block.view-model';
import { BlockEventListener } from './block.event-listener';

export class View {

    private highlightDiv: HTMLElement;
    private selectDiv: HTMLElement;

    eventListener: BlockEventListener;

    constructor(private container: HTMLElement) {
        this.highlightDiv = this.createShadowElement();
        this.selectDiv = this.createShadowElement();
        document.body.appendChild(this.highlightDiv);
        document.body.appendChild(this.selectDiv);

        this.highlightDiv.style.border = '3px dotted #33ada9';
        this.selectDiv.style.border = '3px solid #33ada9';
        this.highlightDiv.addEventListener('mouseleave', () => {
            this.highlightDiv.style.display = 'none';
        })
        this.highlightDiv.addEventListener('click', (event) => {
            this.eventListener.elementClick();
            this.placeElementHover(this.highlightDiv, this.selectDiv);
            this.unlight();
        })
        this.selectDiv.addEventListener('click', (event) => {
            this.eventListener.elementClick();
            this.placeElementHover(this.selectDiv, this.highlightDiv);
            this.deselect();
        })
    }

    highlight(model: BlockViewModel) {
        this.placeElementHover(model.element, this.highlightDiv);
    }

    unlight() {
        this.highlightDiv.style.display = 'none';
    }

    select(model: BlockViewModel) {
        this.placeElementHover(model.element, this.selectDiv);
    }

    deselect() {
        this.selectDiv.style.display = 'none';
    }

    scrollTo(model: BlockViewModel) {
        const rect = this.measureElement(model.element);
        const targetPosition = rect.top - window.innerHeight / 10;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    setList(list: BlockViewModel[]) {
        this.container.innerHTML = '';
        list.forEach(x => this.container.appendChild(x.element));
    }

    insertElement(index: number, model: BlockViewModel) {
        const currentElement = this.container.children.item(index);
        this.container.insertBefore(model.element, currentElement);
    }

    setElement(index: number, model: BlockViewModel) {
        const element = model.element;
        if (this.container.children.length > index) {
            const currentElement = this.container.children.item(index);
            if (currentElement != element) {
                this.container.replaceChild(element, currentElement);
                this.select(model);
            }
        } else {
            this.container.appendChild(element);
        }
    }

    private placeElementHover(source: HTMLElement, target: HTMLElement) {
        const rect = this.measureElement(source);
        target.style.top = rect.top + 'px';
        target.style.left = rect.left + 'px';
        target.style.height = (rect.height - 6) + 'px';
        target.style.width = (rect.width - 6) + 'px';
        target.style.display = 'block';

    }

    private createShadowElement() {
        const result = document.createElement('div');
        result.style.position = 'absolute';
        result.style.display = 'none';
        result.style.zIndex = '10000';
        return result;
    }

    private measureElement(element): { top?: number, left?: number, height?: number, width?: number } {
        const target = element;
        const target_width = target.offsetWidth;
        const target_height = target.offsetHeight;
        let rect = {};
        let gleft = 0;
        let gtop = 0;

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