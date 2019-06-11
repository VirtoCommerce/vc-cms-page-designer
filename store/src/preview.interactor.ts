import { EventsBus } from './root/events.bus';
import { DndInteractor } from './dnd.interactor';
import { BlockViewModel } from './models';
import { ServiceLocator } from './service-locator';
import { measureElement } from './helpers';

export class PreviewInteractor {
    private readonly borderWidth: number = 3;

    private hoverElement: HTMLElement;
    private selectElement: HTMLElement;

    private hoveredViewModel: BlockViewModel = null;
    private selectedViewModel: BlockViewModel = null;

    private inactive = false; // use with dnd

    constructor(private dnd: DndInteractor) {
        this.createHoverElement();
        this.createSelectElement();
        this.dnd.onDragStarted = () => {
            this.inactive = true;
            this.hideHoverElement();
            this.hideSelectElement();
        };
        this.dnd.onDragFinished = () => {
            this.inactive = false;
        }
    }

    hover(vm: BlockViewModel) {
        if (this.inactive) return;
        if (vm == null || this.selectedViewModel == vm) {
            this.hideHoverElement();
        } else {
            this.hoveredViewModel = vm;
            this.hoverElement.style.display = 'block';
            this.placeElementHover(vm.element, this.hoverElement);
        }
    }

    select(vm: BlockViewModel) {
        if (this.inactive) return;
        this.selectedViewModel = vm;
        this.selectElement.style.display = 'block';
        this.placeElementHover(vm.element, this.selectElement);
    }

    deselect() {
        this.hideSelectElement();
    }

    scrollTo(vm: BlockViewModel) {
        if (this.inactive) return;
        const rect = measureElement(vm.element);
        const targetPosition = rect.top - window.innerHeight / 10;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    private hideSelectElement() {
        this.selectedViewModel = null;
        this.selectElement.style.display = 'none';
    }

    private hideHoverElement() {
        this.hoveredViewModel = null;
        this.hoverElement.style.display = 'none';
    }

    private createHoverElement(): HTMLElement {
        const result = this.createShadowElement();
        result.style.border = `${this.borderWidth}px dotted #33ada9`;
        result.addEventListener('mouseleave', () => {
            if (this.hoveredViewModel != null) {
                this.hoveredViewModel.onLeave();
            }
            this.hideHoverElement();
        });
        result.addEventListener('click', (event) => {
            this.select(this.hoveredViewModel);
            this.hoveredViewModel.onSelect();
            this.hideHoverElement();
        });
        result.addEventListener('mousedown', (event: MouseEvent) => {
            this.dnd.mouseDown(event, this.hoveredViewModel);
        });
        this.hoverElement = result;
        return result;
    }

    private createSelectElement(): HTMLElement {
        const result = this.createShadowElement();
        result.style.border = `${this.borderWidth}px solid #33ada9`;
        result.addEventListener('click', (event) => {
            const dispatcher = ServiceLocator.getDispatcher();
            dispatcher.selectBlock(null);
        });
        result.addEventListener('mousedown', (event: MouseEvent) => {
            this.dnd.mouseDown(event, this.selectedViewModel);
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
        const rect = measureElement(source);
        const doubleWidth = this.borderWidth * 2;
        const delta = 0;
        target.style.top = (rect.top + delta) + 'px';
        target.style.left = (rect.left + delta) + 'px';
        target.style.height = (rect.height - 2 * delta) + 'px';
        target.style.width = (rect.width - 2 * delta) + 'px';
        target.style.display = 'block';
    }
}
