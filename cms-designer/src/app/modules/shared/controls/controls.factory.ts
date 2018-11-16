import { Type, Injectable } from '@angular/core';
import {
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    NumberItemComponent,
    SelectItemComponent,
    StringItemComponent,
    TextItemComponent,
    CollectionComponent
} from '.';
import { ControlDescriptor } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ControlsFactory {
    private controls: { [key: string]: Type<any> } = {};

    constructor() {
        this.controls['checkbox'] = CheckboxItemComponent;
        this.controls['color'] = ColorItemComponent;
        this.controls['image'] = ImageItemComponent;
        this.controls['number'] = NumberItemComponent;
        this.controls['select'] = SelectItemComponent;
        this.controls['string'] = StringItemComponent;
        this.controls['text'] = TextItemComponent;
        this.controls['collection'] = CollectionComponent;
    }

    descriptorForCollection(descriptor: ControlDescriptor): boolean {
        // todo: bad practice. const used twice, here and in the control factory
        return descriptor.type === 'collection';
    }

    resolve(type: string): Type<any> {
        const result = this.controls[type];
        return result;
    }
}
