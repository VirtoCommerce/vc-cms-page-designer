import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilesService } from '../../services/files.service';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ImageItemComponent),
        multi: true,
    }]
})
export class ImageItemComponent implements OnInit, ControlValueAccessor {

    @ViewChild('fileInput', { read: ElementRef }) fileInput: ElementRef;

    @Input() label: string;
    @Input() info: string;

    value: string;

    constructor(private files: FilesService) { }

    ngOnInit() { }

    onChange = (_: any) => { };

    openFileDialog() {
        this.fileInput.nativeElement.click();
    }

    writeValue(obj: any): void {
        this.value = obj as string;
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
    registerOnTouched(): void { }

}
