import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SectionModel } from '../../models/section.model';
import { BlocksComponentFactory } from '../../blocks/blocks-component.factory';
import { BlockHostDirective } from '../../blocks/block-host.directive';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isArray } from 'util';
import { FormsHelper } from '../../services/forms.helper';

@Component({
    selector: 'app-page-item-editor',
    templateUrl: './page-item-editor.component.html',
    styleUrls: ['./page-item-editor.component.scss']
})
export class PageItemEditorComponent implements OnInit {

    @Input() model: SectionModel;
    @Output() backEvent = new EventEmitter<SectionModel>();
    @Output() valueChangedEvent = new EventEmitter<SectionModel>();
    @Output() removeBlockEvent = new EventEmitter<SectionModel>();

    @ViewChild(BlockHostDirective) host: BlockHostDirective;

    form: FormGroup;
    get name() { return this.form.get('name'); }

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private blocksFactory: BlocksComponentFactory,
        private fb: FormBuilder,
        private formHelper: FormsHelper) { }

    ngOnInit() {
        this.form = this.fb.group({ name: [this.model.name, Validators.required] });
        const type = this.blocksFactory.resolve(this.model.type);
        if (type != null) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(type);
            const component = this.host.viewContainerRef.createComponent(factory);

            (<any>component.instance).model = this.model;
            (<any>component.instance).group = this.form;
            const uneditableProperties = ['type', 'id', 'name'];
            const extendedModel = Object.assign(this.blocksFactory.create(this.model.type), this.model);
            const keys = Object.keys(extendedModel).filter(x => uneditableProperties.indexOf(x) === -1);
            this.formHelper.fillFormRecursively(extendedModel, this.form, keys);
        }

        this.form.valueChanges.subscribe(value => {
            this.valueChangedEvent.emit(this.getModel());
        });
    }

    back() {
        // this value will be applyed onto current section in the editor.reducer
        // therefore i should not apply the uneditable properties
        this.backEvent.emit(this.form.value);
    }

    removeBlock() {
        this.removeBlockEvent.emit(this.model);
    }

    private getModel(): SectionModel {
        const result = {
            ...this.form.value,
            id: this.model.id,
            type: this.model.type
        };
        return result;
    }
}
