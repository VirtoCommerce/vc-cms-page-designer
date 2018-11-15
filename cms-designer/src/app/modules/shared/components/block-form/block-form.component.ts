import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DisplayTextControlDescriptor, BlockSchema, ValueType } from '../../models';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() schema: BlockSchema;
    @Input() model: {[key: string]: ValueType};

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.schema.settings.filter(x => !!x.id).forEach(x => {
            const control = this.fb.control(this.model[x.id]);
            this.group.addControl(x.id, control);
        });
    }

    getContent(el: DisplayTextControlDescriptor) {
        return el.content;
    }

    getInfo(el) {
        if (!!el) {
            return el.info;
        }
        return null;
    }
}
