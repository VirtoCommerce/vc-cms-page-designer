import { AfterContentInit, ContentChildren, Directive, EventEmitter, Output, QueryList, ElementRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Subscription } from 'rxjs';

export interface SortEvent {
    currentIndex: number;
    newIndex: number;
    complete: boolean;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
    return Math.sqrt(
        Math.pow(rectB.top - rectA.top, 2) +
        Math.pow(rectB.left - rectA.left, 2)
    );
};

const hCenter = (rect: ClientRect): number => {
    return rect.left + rect.width / 2;
};

const vCenter = (rect: ClientRect): number => {
    return rect.top + rect.height / 2;
};

@Directive({
    selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {
    @ContentChildren(DraggableDirective) sortables: QueryList<DraggableDirective>;

    @Output() sort = new EventEmitter<SortEvent>();

    private clientRects: ClientRect[];
    private subscriptions: Subscription[] = [];
    private startIndex: number;
    private newIndex: number;

    constructor(private element: ElementRef) { }

    ngAfterContentInit(): void {
        this.sortables.changes.subscribe(() => {
            this.subscriptions.forEach(x => x.unsubscribe());
            this.sortables.forEach(x => {
                this.subscriptions.push(x.dragStart.subscribe(() => this.measureElement(x)));
                this.subscriptions.push(x.dragMove.subscribe(event => this.maintainElement(x, event)));
                this.subscriptions.push(x.dragEnd.subscribe(event => this.complete(x, event)));
            });
        });
        this.sortables.notifyOnChanges();
    }

    private measureElement(draggable: DraggableDirective) {
        this.clientRects = this.sortables.map(x => x.element.nativeElement.getBoundingClientRect());
        this.startIndex = this.sortables.toArray().indexOf(draggable);
        this.newIndex = this.startIndex;
        // bound area
        const viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();
        const movableClientRect: ClientRect = draggable.element.nativeElement.getBoundingClientRect();
        draggable.positionMin = viewRect.top - movableClientRect.top - draggable.position;
        draggable.positionMax = viewRect.bottom - movableClientRect.bottom + draggable.position;
    }

    private maintainElement(draggable: DraggableDirective, event: PointerEvent) {
        const currentIndex = this.sortables.toArray().indexOf(draggable);
        const currentRect = this.clientRects[currentIndex];

        this.clientRects
            .slice()
            .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
            .filter(rect => rect !== currentRect)
            .some(rect => {
                const isBefore = rect.top < currentRect.top;

                const moveBack = isBefore && event.clientY < rect.bottom;
                const moveForward = !isBefore && event.clientY > rect.top;

                if (moveBack || moveForward) {
                    this.newIndex = this.clientRects.indexOf(rect);
                    this.sort.emit({
                        currentIndex: currentIndex,
                        newIndex: this.newIndex,
                        complete: false
                    });
                    return true;
                }
                return false;
            });
    }

    private complete(draggable: DraggableDirective, event: PointerEvent) {
        if (this.startIndex !== this.newIndex) {
            this.sort.emit({
                currentIndex: this.startIndex,
                newIndex: this.newIndex,
                complete: true
            });
        }
    }
}
