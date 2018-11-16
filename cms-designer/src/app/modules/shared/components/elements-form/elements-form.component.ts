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
        return descriptor.type !== 'header' && descriptor.type !== 'paragraph' && descriptor.type !== 'list';
    }

    displayCollection(descriptor: ControlDescriptor): boolean {
        return descriptor.type === 'list';
    }

    sortItems(event: SortEvent) {
        // todo
    }

    getTitle(item: FormGroup, control: CollectionControlDescriptor): string {
        return (control.displayField ? item.value[control.displayField] : null) || '<no title>';
    }

    removeElement(index: number) {
        // todo
    }

    addElement() {
        // todo
    }

    getRemoveButtonTitle(descriptor: CollectionControlDescriptor): string {
        return descriptor.removeText || 'Add item';
    }

    getAddButtonTitle(descriptor: CollectionControlDescriptor): string {
        return descriptor.addText || 'Add item';
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
