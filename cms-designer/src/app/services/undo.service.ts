import { Injectable } from '@angular/core';
import { UndoItem } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class UndoService {

    private pointer = 0;
    private stack: UndoItem[] = [];

    push(item: UndoItem) {
        this.stack.splice(this.pointer, -this.pointer);
        this.pointer = 0;
        this.stack.push(item);
    }

    pop(): UndoItem {
        const result = this.stack[this.stack.length + this.pointer];
        this.pointer--;
        return result;
    }

    peek(): UndoItem {
        return this.stack[this.stack.length + this.pointer];
    }
}
