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
            if (!event || !event.target) {
                console.log(this.value);
                fn(this.value);
            } else {
                const file = event.target.files[0];
                const subscription = this.files.uploadFile(file, file.name).subscribe(x => {
                    subscription.unsubscribe();
                    this.setValue({ url: x });
                    fn(this.value);
                });
            }
        };
    }

    changeWidth(value: number) {
        this.setValue({ width: (value || undefined) });
        this.onChange(this.value);
    }

    changeHeight(value: number) {
        this.setValue({ height: (value || undefined) });
        this.onChange(this.value);
    }

    removeImage($event: MouseEvent) {
        this.setValue({ url: null });
        this.onChange(this.value);
    }

    setValue(value: ImageDescriptor|string) {
        // TODO: remove before relese. used for backward compatibility when develop
        if (typeof value === 'string') {
            value = { url: value };
        }
        const result = { ...this.value, ...value };
        super.setValue(result);
    }
}

interface ImageDescriptor {
    url?: string;
    width?: number;
    height?: number;
}
