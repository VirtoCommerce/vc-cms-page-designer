import { BlockViewModel } from './models';
import { ServiceLocator } from './service-locator';

export class PreviewInteractor {
    private readonly borderWidth: number = 3;

    private hoverElement: HTMLElement;
    private selectElement: HTMLElement;

    private hoveredViewModel: BlockViewModel = null;
    private selectedViewModel: BlockViewModel = null;

    constructor() {
        this.createHoverElement();
        this.createSelectElement();
    }

    hover(vm: BlockViewModel) {
        if (vm == null || this.selectedViewModel == vm) {
            this.hoveredViewModel = null;
            this.hoverElement.style.display = 'none';
        } else {
            this.hoveredViewModel = vm;
            this.hoverElement.style.display = 'block';
            this.placeElementHover(vm.element, this.hoverElement);
        }
    }

    select(vm: BlockViewModel) {
        this.selectedViewModel = vm;
        this.selectElement.style.display = 'block';
        this.placeElementHover(vm.element, this.selectElement);
    }

    deselect() {
        this.hideSelectElement();
        this.selectedViewModel = null;
    }

    scrollTo(vm: BlockViewModel) {
        const rect = this.measureElement(vm.element);
        const targetPosition = rect.top - window.innerHeight / 10;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    private hideSelectElement() {
        this.selectElement.style.display = 'none';
    }

    private hideHoverElement() {
        this.hoverElement.style.display = 'none';
    }

    private createHoverElement(): HTMLElement {
        const result = this.createShadowElement();
        result.style.border = `${this.borderWidth}px dotted #33ada9`;
        result.addEventListener('mouseleave', () => {
            this.hideHoverElement();
            this.hoveredViewModel.onLeave();
            this.hoveredViewModel = null;
        });
        result.addEventListener('click', (event) => {
            this.hideHoverElement();
            this.select(this.hoveredViewModel);
            this.hoveredViewModel.onSelect();
        })
        this.hoverElement = result;
        return result;
    }

    private createSelectElement(): HTMLElement {
        const result = this.createShadowElement();
        result.style.border = `${this.borderWidth}px solid #33ada9`;
        result.addEventListener('click', () => {
            const dispatcher = ServiceLocator.getDispatcher();
            dispatcher.selectBlock(null);
            console.log('click');
        });
        result.addEventListener('mousedown', () => {
            console.log('mousedown');
        });
        this.selectElement = result;
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
        if (!source) {
            return;
        }
        const rect = this.measureElement(source);
        const doubleWidth = this.borderWidth * 2;
        target.style.top = rect.top + 'px';
        target.style.left = rect.left + 'px';
        target.style.height = (rect.height - doubleWidth) + 'px';
        target.style.width = (rect.width - doubleWidth) + 'px';
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
