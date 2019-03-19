import { BlockViewModel } from './block.view-model';

export class Renderer {
    private readonly borderWidth: number = 3;

    private hoverElement: HTMLElement;
    private selectElement: HTMLElement;

    constructor(private container: HTMLElement) {
        this.hoverElement = this.createHoverElement();
        this.selectElement = this.createSelectElement();
    }

    add(vm: BlockViewModel) {
        vm.element = this.createElement(vm);
        this.container.append(vm.element);
    }

    update(vm: BlockViewModel) {
        const element = vm.element;
        vm.element = this.createElement(vm);
        this.container.replaceChild(vm.element, element);
    }

    insert(vm: BlockViewModel, index: number) {
        vm.element = this.createElement(vm);
        const beforeElement = this.container.children.item(index);
        this.container.insertBefore(vm.element, beforeElement);
        if (vm.hidden) {
            vm.element.style.display = 'none';
        }
    }

    select(vm: BlockViewModel = null) {
        if (vm === null || vm.hidden || !vm.selected) {
            this.selectElement.style.display = 'none';
        } else {
            this.selectElement.style.display = 'block';
            this.placeElementHover(vm.element, this.selectElement);
        }
    }

    private createElement(vm: BlockViewModel) {
        const div = document.createElement('div');
        div.innerHTML = `<div>${vm.htmlString}</div>`;
        const result = <HTMLElement>div.firstChild;
        if (!vm.isPreview) {
            result.addEventListener('mouseover', () => vm.onHover());
            result.addEventListener('click', () => vm.onClick());
        }
        // TODO: add events
        //      hover
        //      mouse up
        //      mouse down
        //      mouse move
        return result;
    }

    private createHoverElement(): HTMLElement {
        const result = this.createShadowElement();
        result.style.border = '3px dotted #33ada9';
        // result.addEventListener('mouseleave', () => {
        //     result.style.display = 'none';
        // })
        // result.addEventListener('click', (event) => {
        //     this.eventListener.elementClick();
        //     this.placeElementHover(this.highlightDiv, this.selectDiv);
        //     this.unlight();
        // })
        // this.selectDiv.style.border = '3px solid #33ada9';
        // this.selectDiv.addEventListener('click', (event) => {
        //     this.eventListener.elementClick();
        //     this.placeElementHover(this.selectDiv, this.highlightDiv);
        //     this.deselect();
        // })

        return result;
    }

    private createSelectElement(): HTMLElement {
        const result = this.createShadowElement();
        result.style.border = '3px solid #33ada9';
        return result;
    }

    private createShadowElement(): HTMLElement {
        const result = document.createElement('div');
        result.style.position = 'absolute';
        result.style.display = 'none';
        result.style.zIndex = '10000';
        document.body.appendChild(result);
        return result;
    }

    private placeElementHover(source: HTMLElement, target: HTMLElement) {
        const rect = this.measureElement(source);
        target.style.top = rect.top + 'px';
        target.style.left = rect.left + 'px';
        target.style.height = (rect.height - 6) + 'px';
        target.style.width = (rect.width - 6) + 'px';
        target.style.display = 'block';
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
