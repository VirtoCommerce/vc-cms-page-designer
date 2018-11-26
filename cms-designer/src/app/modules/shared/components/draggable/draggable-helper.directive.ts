import {
    Directive,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    EmbeddedViewRef
} from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
    selector: '[appDraggableHelper]',
    exportAs: 'appDraggableHelper'
})
export class DraggableHelperDirective implements OnInit {

    private startPosition = 0;
    private startRect: ClientRect;
    private element: HTMLElement;

    constructor(
        private draggable: DraggableDirective,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        this.draggable.dragStart.subscribe(event => this.onDragStart(event));
        this.draggable.dragMove.subscribe(event => this.onDragMove(event));
        this.draggable.dragEnd.subscribe(() => this.onDragEnd());
    }

    private onDragStart(event: PointerEvent): void {
        this.startRect = this.draggable.element.nativeElement.getBoundingClientRect();
        // event.clientY - position relative window
        // startRect - relative window
        this.startPosition = event.clientY;
        this.draggable.position = 0;
    }

    private onDragMove(event: PointerEvent): void {
        console.log('drag move');
        let top = event.clientY - this.startPosition;
        if (Math.abs(top) < 3 && !this.element) {
            return;
        }
        if (!this.element) {
            this.element = this.viewContainerRef.createEmbeddedView(this.templateRef).rootNodes[0];

            // helper element position = original element position
            this.element.style.top = this.draggable.element.nativeElement.offsetTop + 'px';
        }
        top = Math.max(this.draggable.positionMin, top);
        top = Math.min(this.draggable.positionMax, top);
        this.draggable.position = top;
        this.element.style.transform = `translateY(${top}px)`;
    }

    private onDragEnd(): void {
        this.viewContainerRef.clear();
        this.element = null;
    }
}
