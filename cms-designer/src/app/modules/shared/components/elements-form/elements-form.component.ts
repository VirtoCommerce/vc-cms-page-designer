import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { DisplayTextControlDescriptor, BlockSchema, ControlDescriptor, CollectionControlDescriptor } from '../../models';
import { ControlsFactory } from '../../controls/controls.factory';
import { SortEvent } from '..';

@Component({
    selector: 'app-elements-form',
    templateUrl: './elements-form.component.html'
})
export class ElementsFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() descriptors: ControlDescriptor[];

    constructor(private factory: ControlsFactory) { }

    ngOnInit(): void { }

    getContent(el: DisplayTextControlDescriptor) {
        return el.content;
    }

    getInfo(el) {
        if (!!el) {
            return el.info;
        }
        return null;
    }

    displaySimpleControl(descriptor: ControlDescriptor): boolean {
        return descriptor.type !== 'header' && descriptor.type !== 'paragraph' && descriptor.type !== 'collection';
    }

    displayCollection(descriptor: ControlDescriptor): boolean {
        return descriptor.type === 'collection';
    }

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

    getElementDescriptors(descriptor: CollectionControlDescriptor): ControlDescriptor[] {
        return descriptor.element;
    }

    getControls(descriptor: CollectionControlDescriptor): AbstractControl[] {
        const formArray = this.group.get(descriptor.id) as FormArray;
        return formArray.controls;
        // return this.group.get(name) as FormArray;
    }
}
