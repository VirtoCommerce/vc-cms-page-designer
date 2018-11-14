import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlockModel } from 'src/app/modules/shared/models';
import { ValueType } from '../../models';

@Component({
    selector: 'app-theme-item-editor',
    templateUrl: './theme-item-editor.component.html',
    styleUrls: ['./theme-item-editor.component.scss']
})
export class ThemeItemEditorComponent implements OnInit, AfterViewInit {

    form: FormGroup;

    @Input() schema: BlockModel;
    @Input() theme: {[key: string]: ValueType};
    @Output() backEvent = new EventEmitter<{[key: string]: ValueType}>();
    @Output() valueChangedEvent = new EventEmitter<any>();

    constructor(private fb: FormBuilder) { }

    ngAfterViewInit(): void { }

    ngOnInit() {
        this.form = this.fb.group({ });
        this.schema.settings.filter(x => !!x.id).forEach(x => {
            const control = this.fb.control(this.theme[x.id]);
            this.form.addControl(x.id, control);
        });

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
