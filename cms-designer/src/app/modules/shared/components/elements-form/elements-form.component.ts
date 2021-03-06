import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { DisplayTextControlDescriptor, ControlDescriptor, CollectionControlDescriptor } from '../../models';
import { FormHelper } from './../../services/form.helper';
import { SortEvent } from '..';

@Component({
    selector: 'app-elements-form',
    templateUrl: './elements-form.component.html'
})
export class ElementsFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() descriptors: ControlDescriptor[];

    constructor(private formHelper: FormHelper) { }

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

    sortItems(control: CollectionControlDescriptor, event: SortEvent) {
        if (!event.complete) {
            const controls = this.getControls(control);
            const current = controls[event.currentIndex];
            const swapWith = controls[event.newIndex];

            controls[event.newIndex] = current;
            controls[event.currentIndex] = swapWith;
        }
    }

    getTitle(item: FormGroup, control: CollectionControlDescriptor): string {
        return (control.displayField ? item.value[control.displayField] : null) || '<no title>';
    }

    removeElement(control: CollectionControlDescriptor, index: number) {
        const formArray = this.getFormArray(control);
        formArray.removeAt(index);
    }

    addElement(control: CollectionControlDescriptor) {
        const formArray = this.getFormArray(control);
        const newElementGroup = this.formHelper.generateForm({}, control.element);
        formArray.push(newElementGroup);
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
        return this.getFormArray(descriptor).controls;
        // return this.group.get(name) as FormArray;
    }

    trackByFn(index, item) {
        return item.id;
    }

    private getFormArray(descriptor: CollectionControlDescriptor): FormArray {
        const formArray = this.group.get(descriptor.id) as FormArray;
        return formArray;
    }
}
