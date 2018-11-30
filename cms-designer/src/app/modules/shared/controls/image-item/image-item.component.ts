import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { BaseControlComponent } from '../base-control.component';
import { ImageControlDescriptor } from '../../models';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent extends BaseControlComponent<ImageControlDescriptor> implements OnInit {

    @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef;

    constructor(private files: FilesService) {
        super();
    }

    ngOnInit() { }

    openFileDialog() {
        this.fileInput.nativeElement.click();
    }

    registerOnChange(fn: any): void {
        this.onChange = (event) => {
            const file = event.target.files[0];
            const subscription = this.files.uploadFile(file, file.name).subscribe(x => {
                subscription.unsubscribe();
                this.value = x;
                fn(x);
            });
        };
    }

    removeImage($event: MouseEvent) {
        $event.preventDefault();
        this.value = null;
    }
}
