import { BlockViewModel } from './block.view-model';
import { measureElement } from './helpers';
import { EventsBus } from './root/events.bus';

export class DndInteractor {

    private delta = 10;

    private placeholder: HTMLElement;

    private isPressed: boolean;
    private dragStarted: boolean;
    private model: BlockViewModel;

    private startMouseY: number = null;
    private elementRect: any;
    private list: BlockViewModel[];
    private rects: any[];
    private oldStyle: any = {};
    private minY: number;
    private maxY: number;

    onDragStarted = () => { };
    onDragFinished = (draggedModel: BlockViewModel) => { };
    onSwapBlocks = (first, second) => { };

    constructor(private container: HTMLElement, private listAccessor: () => []) {
        this.placeholder = document.createElement('div');
        this.placeholder.style.backgroundColor = '#eeeeee';
        window.addEventListener('mousemove', ($event) => {
            if (this.isPressed) {
                if (!this.dragStarted) {
                    this.startDrag($event);
                } else {
                    this.drag($event);
                }
            }
        });
        window.addEventListener('mouseup', ($event) => {
            if (this.dragStarted) {
                this.releaseDrag();
            }
            this.isPressed = false;
        });
    }

    mouseDown($event: MouseEvent, vm: BlockViewModel) {
        this.isPressed = true;
        this.model = vm;
        this.startMouseY = $event.pageY;
        this.elementRect = measureElement(vm.element);
        this.placeholder.style.height = this.elementRect.height + 'px';
        this.list = this.listAccessor();
        const targetRect = measureElement(this.container);
        this.minY = targetRect.top;
        this.maxY = targetRect.top + targetRect.height;
        this.rects = this.list.map(x => measureElement(x.element));
    }

    private startDrag($event: MouseEvent) {
        if (Math.abs($event.pageY - this.startMouseY) >= this.delta) {
            this.dragStarted = true;
            this.onDragStarted();
            this.container.replaceChild(this.placeholder, this.model.element);
            document.body.appendChild(this.model.element);
            this.saveStyle();
            this.styleDraggedBlock();
            this.container.style.height = measureElement(this.container).height + 'px';
        }
    }

    private drag(event: MouseEvent) {
        const mouseY = Math.max(Math.min(event.pageY, this.maxY), this.minY)
        this.model.element.style.top = mouseY - this.startMouseY + this.elementRect.top + 'px';
        const to = this.rects.findIndex(x => x !== this.model && x.top < mouseY && (x.top + x.height) > mouseY);
        const from = this.list.indexOf(this.model);
        if (from === -1 || to === -1 || from === to) return;
        const middleY = (this.rects[to].top + this.rects[to].height / 2);
        const needSwap = (from > to && mouseY <= middleY) || (from <= to && mouseY > middleY);
        if (needSwap) {
            console.log(from, to, mouseY, this.rects[to]);
            this.container.removeChild(this.placeholder);
            const beforeElement = this.container.children.item(to);
            this.container.insertBefore(this.placeholder, beforeElement);
            const msg = { content: { id: this.model.id, currentIndex: from, newIndex: to } };
            EventsBus.Current.publish('dnd.swap-blocks', msg, this);
            console.log('swapped');
            // debugger;
        }
        // get new coords
        // search element under mouse
        // if above a half of element change up (send message to designer)
        // if below a half of element change down (send message to designer)
    }

    private releaseDrag() {
        // if drag happens
        // replace placeholder with source element
        // restore height of other elements
        // 'select' should be occured automatically

        if (this.dragStarted) {
            console.log('release drag', this.model);
            document.body.removeChild(this.model.element);
            this.restoreStyles();
            this.container.replaceChild(this.model.element, this.placeholder);
            this.elementRect = null;
            this.startMouseY = null;
            this.onDragFinished(this.model);
            this.oldStyle = {};
            this.container.style.height = '';
        }

        this.dragStarted = false;
        this.isPressed = false;
        this.model = null;
    }

    private saveStyle() {
        this.oldStyle.left = this.model.element.style.left;
        this.oldStyle.top = this.model.element.style.top;
        this.oldStyle.width = this.model.element.style.width;
        this.oldStyle.height = this.model.element.style.height;
        this.oldStyle.postion = this.model.element.style.position;
        this.oldStyle.backgroundColor = this.model.element.style.backgroundColor;
        this.oldStyle.border = this.model.element.style.border;
        this.oldStyle.opacity = this.model.element.style.opacity;
    }

    private restoreStyles() {
        this.model.element.style.position = this.oldStyle.position || 'static';
        this.model.element.style.left = this.oldStyle.left;
        this.model.element.style.top = this.oldStyle.top;
        this.model.element.style.width = this.oldStyle.width;
        this.model.element.style.height = this.oldStyle.height;
        this.model.element.style.backgroundColor = this.oldStyle.backgroundColor;
        this.model.element.style.border = this.oldStyle.border;
        this.model.element.style.opacity = this.oldStyle.opacity;
    }

    private styleDraggedBlock() {
        this.model.element.style.left = this.elementRect.left + 'px';
        this.model.element.style.top = this.elementRect.top + 'px';
        this.model.element.style.width = this.elementRect.width + 'px';
        this.model.element.style.height = this.elementRect.height + 'px';
        this.model.element.style.overflow = 'hidden';
        this.model.element.style.position = 'absolute';
        this.model.element.style.backgroundColor = '#fefefe';
        this.model.element.style.border = '3px solid #33ada9';
        this.model.element.style.opacity = "0.5";
    }
}
