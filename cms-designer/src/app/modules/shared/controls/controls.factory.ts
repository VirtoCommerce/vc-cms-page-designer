import { Type, Injectable } from '@angular/core';
import {
    CheckboxItemComponent,
    ColorItemComponent,
    ImageItemComponent,
    NumberItemComponent,
    SelectItemComponent,
    StringItemComponent,
    TextItemComponent,
    UrlItemComponent
} from '.';

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
        this.controls['url'] = UrlItemComponent;
    }

    resolve(type: string): Type<any> {
        const result = this.controls[type];
        return result;
    }
}
