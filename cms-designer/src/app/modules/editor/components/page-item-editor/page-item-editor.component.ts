import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SectionModel } from '../../models/section.model';
import { BlocksComponentFactory } from '../../blocks/blocks-component.factory';
import { BlockHostDirective } from '../../blocks/block-host.directive';

@Component({
    selector: 'app-page-item-editor',
    templateUrl: './page-item-editor.component.html',
    styleUrls: ['./page-item-editor.component.scss']
})
export class PageItemEditorComponent implements OnInit {

    @Input() model: SectionModel;
    @Output() backEvent = new EventEmitter<any>();

    @ViewChild(BlockHostDirective) host: BlockHostDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private blocksFactory: BlocksComponentFactory) { }

    ngOnInit() {
        const type = this.blocksFactory.resolve(this.model.type);
        if (type != null) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(type);
            const component = this.host.viewContainerRef.createComponent(factory);

            (<any>component.instance).model = this.model;
        }
    }

    back() {
        this.backEvent.emit();
    }
}
