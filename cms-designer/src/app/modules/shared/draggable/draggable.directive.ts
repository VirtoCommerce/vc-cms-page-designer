import {
    Directive,
    EventEmitter,
    HostBinding,
    HostListener,
    Output,
    ElementRef
} from '@angular/core';

@Directive({
    selector: '[appDraggable]'
})
export class DraggableDirective {
    @HostBinding('class.draggable') draggable = true;

    // current element value
    position = 0;
    positionMin = 0;
    positionMax = 0;

    pointerId?: number;

    @HostBinding('attr.touch-action') touchAction = 'none';

    @Output() dragStart = new EventEmitter<PointerEvent>();
    @Output() dragMove = new EventEmitter<PointerEvent>();
    @Output() dragEnd = new EventEmitter<PointerEvent>();

    @HostBinding('class.dragging') dragging = false;

    constructor(public element: ElementRef) { }

    @HostListener('pointerdown', ['$event'])
    onPointerDown(event: PointerEvent): void {
        if (event.button !== 0) {
            return;
        }

        this.pointerId = event.pointerId;

        this.dragging = true;
        this.dragStart.emit(event);
    }

    @HostListener('document:pointermove', ['$event'])
    onPointerMove(event: PointerEvent): void {
        if (!this.dragging || event.pointerId !== this.pointerId) {
            return;
        }

        this.dragMove.emit(event);
    }

    @HostListener('document:pointercancel', ['$event'])
    @HostListener('document:pointerup', ['$event'])
    onPointerUp(event: PointerEvent): void {
        if (!this.dragging || event.pointerId !== this.pointerId) {
            return;
        }

        this.dragging = false;
        this.dragEnd.emit(event);
    }
}
