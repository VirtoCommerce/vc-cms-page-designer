import { BlockViewModel } from './block.view-model';
import { measureElement } from './helpers';

export class DndInteractor {

    private delta = 10;

    private placeholder: HTMLElement;

    private isPressed: boolean;
    private dragStarted: boolean;
    private model: BlockViewModel;

    private startMouseY: number = null;
    private elementRect: any;
    private oldStyle: any = {};

    onDragStarted = () => { };
    onDragFinished = (draggedModel: BlockViewModel) => { };

    constructor(private container: HTMLElement) {
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
        console.log('mouse down', vm)
        this.isPressed = true;
        this.model = vm;
        this.startMouseY = $event.pageY;
        this.elementRect = measureElement(vm.element);
        this.placeholder.style.height = this.elementRect.height + 'px';

    }

    private mouseUp($event: MouseEvent) {
        this.releaseDrag();
    }

    private startDrag($event: MouseEvent) {
        if (Math.abs($event.pageY - this.startMouseY) >= this.delta) {
            this.dragStarted = true;
            this.onDragStarted();
            this.container.replaceChild(this.placeholder, this.model.element);
            document.body.appendChild(this.model.element);
            this.oldStyle.left = this.model.element.style.left;
            this.oldStyle.top = this.model.element.style.top;
            this.oldStyle.width = this.model.element.style.width;
            this.oldStyle.height = this.model.element.style.height;
            this.oldStyle.postion = this.model.element.style.position;
            this.oldStyle.backgroundColor = this.model.element.style.backgroundColor;
            this.oldStyle.border = this.model.element.style.border;
            this.model.element.style.left = this.elementRect.left + 'px';
            this.model.element.style.top = this.elementRect.top + 'px';
            this.model.element.style.width = this.elementRect.width + 'px';
            // this.model.element.style.height = this.elementRect.height + 'px';
            this.model.element.style.position = 'absolute';
            this.model.element.style.backgroundColor = '#fefefe';
            this.model.element.style.border = '3px solid #33ada9';
        }
    }

    private drag(event: MouseEvent) {
        this.model.element.style.top = (event.pageY - this.startMouseY + this.elementRect.top) + 'px';
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
            this.model.element.style.position = this.oldStyle.position || 'static';
            this.model.element.style.left = this.oldStyle.left;
            this.model.element.style.top = this.oldStyle.top;
            this.model.element.style.width = this.oldStyle.width;
            this.model.element.style.height = this.oldStyle.height;
            this.model.element.style.backgroundColor = this.oldStyle.backgroundColor;
            this.model.element.style.border = this.oldStyle.border;
            this.container.replaceChild(this.model.element, this.placeholder);
            this.elementRect = null;
            this.startMouseY = null;
            this.onDragFinished(this.model);
            this.oldStyle = {};
        }

        this.dragStarted = false;
        this.isPressed = false;
        this.model = null;
    }
}
