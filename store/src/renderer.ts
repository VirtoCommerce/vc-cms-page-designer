import { BlockViewModel } from './block.view-model';
import { PreviewInteractor } from './preview.interactor';
import { DndInteractor } from './dnd.interactor';

export class Renderer {

    private interactor: PreviewInteractor;

    constructor(private container: HTMLElement) {
        this.interactor = new PreviewInteractor(new DndInteractor(container));
    }

    add(vm: BlockViewModel) {
        vm.element = this.createElement(vm);
        this.container.append(vm.element);
        if (vm.hidden) {
            vm.element.style.display = 'none';
        }
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
            this.interactor.deselect();
        } else {
            this.interactor.select(vm)
        }
    }

    scrollTo(vm: BlockViewModel) {
        if (vm && vm.element && !vm.hidden) {
            this.interactor.scrollTo(vm)
        }
    }

    hover(vm: BlockViewModel = null) {
        if (vm === null || vm.hidden || vm.selected) {
            this.interactor.hover(null);
        } else {
            this.interactor.hover(vm);
        }
    }

    private createElement(vm: BlockViewModel) {
        const div = document.createElement('div');
        div.innerHTML = `<div>${vm.htmlString}</div>`;
        const result = <HTMLElement>div.firstChild;
        if (!vm.isPreview) {
            result.addEventListener('mouseover', ($event: MouseEvent) => {
                this.interactor.hover(vm);
                vm.onHover();
            });
            result.addEventListener('click', () => vm.onSelect());
        }
        return result;
    }
}
