import { Component, ViewChild, ElementRef } from '@angular/core';
import { FilesService } from '@shared/services';
import { BaseControlComponent } from '../base-control.component';
import { ImageControlDescriptor } from '@shared/models';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent extends BaseControlComponent<ImageControlDescriptor> {

    @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef;

    constructor(private files: FilesService) {
        super();
    }

    openFileDialog() {
        this.fileInput.nativeElement.click();
    }

    registerOnChange(fn: any): void {
        this.onChange = (event) => {
            if (!event) {
                fn(null);
            } else {
                const file = event.target.files[0];
                const subscription = this.files.uploadFile(file, file.name).subscribe(x => {
                    subscription.unsubscribe();
                    this.setValue(x);
                    console.log(this.value);
                    fn(x);
                });
            }
        };
    }

    removeImage($event: MouseEvent) {
        this.setValue(null);
        this.onChange(this.value);
    }
}
