import { Component } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { CollectionControlDescriptor } from './../../models/collection-control.descriptor';
import { SortEvent } from './../../components/draggable/sortable-list.directive';
import { FormArray, AbstractControl } from '@angular/forms';
import { ControlDescriptor } from '../../models';

@Component({
    templateUrl: './collection.component.html'
})
export class CollectionComponent extends BaseControlComponent<CollectionControlDescriptor> {

    sortItems(event: SortEvent) {
        // todo
    }

    getTitle(item: any): string {
        // todo
        return '<no title>';
    }

    removeElement(index: number) {
        // todo
    }

    addElement() {
        // todo
    }

    getRemoveButtonTitle(): string {
        // todo
        return 'Remove item';
    }

    getAddButtonTitle(): string {
        // todo
        return 'Add item';
    }

    getElementSchema(): ControlDescriptor[] {
        return this.descriptor.element;
    }

    getControls(): AbstractControl[] {
        const formArray = this.group.get(this.descriptor.id) as FormArray;
        return formArray.controls;
        // return this.group.get(name) as FormArray;
    }
}
