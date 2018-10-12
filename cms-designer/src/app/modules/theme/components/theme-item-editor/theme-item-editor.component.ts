import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SchemaItemModel } from '../../models/schema-item.model';

@Component({
    selector: 'app-theme-item-editor',
    templateUrl: './theme-item-editor.component.html',
    styleUrls: ['./theme-item-editor.component.scss']
})
export class ThemeItemEditorComponent implements OnInit, AfterViewInit {

    form: FormGroup;

    @Input() schema: SchemaItemModel;
    @Input() theme: {[key: string]: any};
    @Output() backEvent = new EventEmitter<{[key: string]: any}>();

    constructor(private fb: FormBuilder) { }

    ngAfterViewInit(): void { }

    ngOnInit() {
        this.form = this.fb.group({ });
        this.schema.settings.filter(x => !!x.id).forEach(x => {
            const control = this.fb.control(this.theme[x.id]);
            this.form.addControl(x.id, control);
        });
    }

    back() {
        this.backEvent.emit(this.form.value);
    }

}
