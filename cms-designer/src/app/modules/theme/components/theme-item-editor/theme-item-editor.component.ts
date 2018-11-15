import { DisplayTextControlDescriptor } from './../../../shared/models/display-text-control.descriptor';
import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockSchema, ValueType } from 'src/app/modules/shared/models';

@Component({
    selector: 'app-theme-item-editor',
    templateUrl: './theme-item-editor.component.html',
    styleUrls: ['./theme-item-editor.component.scss']
})
export class ThemeItemEditorComponent implements OnInit, AfterViewInit {

    form: FormGroup;

    @Input() schema: BlockSchema;
    @Input() theme: {[key: string]: ValueType};
    @Output() backEvent = new EventEmitter<{[key: string]: ValueType}>();
    @Output() valueChangedEvent = new EventEmitter<any>();

    constructor(private fb: FormBuilder) { }

    ngAfterViewInit(): void { }

    ngOnInit() {
        this.form = this.fb.group({ });
        this.form.valueChanges.subscribe(_ => {
            this.valueChangedEvent.emit(this.getModel());
        });
    }

    back() {
        this.backEvent.emit();
    }

    private getModel() {
        const result = {
            ...this.form.value,
        };
        return result;
    }
}
