import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { BlockType, SectionModel } from '../../models';
import { FormsHelper } from '../../forms.helper';

@Component({
    selector: 'app-textcolumns-with-images',
    templateUrl: './textcolumns-with-images.component.html'
})
export class TextColumnsWithImagesComponent {
    static Key = 'textcolumns-with-images';

    @Input() model: any;
    @Input() group: FormGroup;

    imageAlignmentOptions = [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' }
    ];

    imageSizeOptions = [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
    ];

    static createModel(item: BlockType): SectionModel { // вызывается при создании нового блока
        return <SectionModel>{
            type: TextColumnsWithImagesComponent.Key,
            name: item.name,
            columns: [ ],
            imageAlignment: 'top',
            imageSize: 'medium'
        };
    }

    static createPreview(): SectionModel { // вызывается при создании превью, перед добавлением блока
        return <SectionModel>{
            type: TextColumnsWithImagesComponent.Key,
            name: 'Text columns with images',
            columns: [ ],
            imageAlignment: 'top',
            imageSize: 'medium'
        };
    }

    constructor(private formHelper: FormsHelper) { }

    private generateImageItem(): any {
        return {
            title: '',
            content: '',
            url: '',
            width: 1
        };
    }

    addColumn() {
        const group = this.formHelper.fillFormRecursively(this.generateImageItem());
        const list = this.getFormArray('columns');
        list.push(group);
    }

    removeColumn(index: number) {
        const list = this.getFormArray('columns');
        list.removeAt(index);
    }

    getTitle(item: FormGroup) {
        return item.controls.title.value || '<empty title>';
    }

    getFormArray(name: string): FormArray {
        return this.group.get(name) as FormArray;
    }
}
