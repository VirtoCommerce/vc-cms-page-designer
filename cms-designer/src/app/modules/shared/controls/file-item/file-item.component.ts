import { Component, ViewChild, ElementRef } from '@angular/core';
import { FilesService } from '@shared/services';
import { BaseControlComponent } from '../base-control.component';
import { FileItemControlDescriptor } from '@shared/models';

@Component({
    selector: 'file-item',
    templateUrl: './file-item.component.html',
    styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent extends BaseControlComponent<FileItemControlDescriptor> {

    @ViewChild('control') control: ElementRef;

    constructor(private files: FilesService) {
        super();
    }

    registerOnChange(fn: any): void {
        this.onChange = (event) => {
            if (!event || !event.target) {
                console.log(this.value);
                fn(this.value);
            } else {
                const file = event.target.files[0];
                const subscription = this.files.uploadFile(file, file.name).subscribe(x => {
                    subscription.unsubscribe();
                    this.setValue(x);
                    fn(this.value);
                });
            }
        };
    }

    getFocusableControl(): ElementRef {
        return this.control;
    }
}
