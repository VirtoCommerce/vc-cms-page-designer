import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { DisplayTextControlDescriptor, ControlDescriptor, CollectionControlDescriptor, BlockValuesModel } from '@shared/models';
import { FormHelper } from '@shared/services';

@Component({
    selector: 'app-elements-form',
    templateUrl: './elements-form.component.html'
})
export class ElementsFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() descriptors: ControlDescriptor[];
    @Input() context: any;

    private savedItem: any;
    editableItem: FormGroup;

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
        return ['header', 'paragraph', 'list'].indexOf(descriptor.type) === -1;
    }

    displayCollection(descriptor: ControlDescriptor): boolean {
        return descriptor.type === 'list';
    }

    inTab(descriptor: ControlDescriptor): boolean {
        return !this.context ||
            descriptor.tab === this.context.filter ||
            (!descriptor.tab && (this.context.filter === 'General' || !this.context.filter));
    }

    sortItems(control: CollectionControlDescriptor, event: CdkDragSortEvent<any>) {
        const controls = this.getFormArray(control);
        const value = controls.value;
        const current = value.splice(event.previousIndex, 1);
        value.splice(event.currentIndex, 0, ...current);
        controls.patchValue(value);
        // this.group.updateValueAndValidity({ emitEvent: true });
    }

    getTitle(item: FormGroup, control: CollectionControlDescriptor, index: number): string {
        const el: any = item;
        let result = (control.displayField ? item.value[control.displayField] : null)
            || `${el._index || (el._index = index)}. <no title>`;
        if (result.length > 15) {
            result = result.substring(0, 14) + '…';
        }
        return result;
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

    editCollectionItem(item) {
        this.editableItem = item;
        this.savedItem = item.value;
    }

    cancelEditCollectionItem() {
        this.editableItem.reset(this.savedItem);
        this.editableItem = null;
        this.savedItem = null;
    }

    saveEditCollectionItem() {
        this.editableItem = null;
        this.savedItem = null;
    }

    private getFormArray(descriptor: CollectionControlDescriptor): FormArray {
        const formArray = this.group.get(descriptor.id) as FormArray;
        return formArray;
    }
}
