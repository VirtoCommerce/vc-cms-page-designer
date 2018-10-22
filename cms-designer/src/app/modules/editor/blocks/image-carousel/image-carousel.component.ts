import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { SectionModel } from '../../models/section.model';
import { BlockType } from '../../models/block-type.model';
import { BlocksComponentFactory } from '../blocks-component.factory';
import { FormsHelper } from '../../services/forms.helper';
import { SortEvent } from 'src/app/modules/shared/draggable';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html'
})
export class ImageCarouselComponent {
    static Key = 'image-carousel';

    @Input() model: any;
    @Input() group: FormGroup;

    blockWidthOptions = [
        { label: 'Screen', value: 'screen' },
        { label: 'Container', value: 'container' },
        { label: 'Small', value: 'small' }
    ];

    rotationFrequencyOptions = [
        { label: '5000', value: '5 seconds' },
        { label: '6000', value: '6 seconds' },
        { label: '7000', value: '7 seconds' },
        { label: '8000', value: '8 seconds' },
        { label: '9000', value: '9 seconds' }
    ];

    constructor(private formHelper: FormsHelper) { }

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: ImageCarouselComponent.Key,
            name: item.name,
            images: [],
            autoRotate: true,
            rotationFrequency: '7000',
            blockWidth: 'screen'
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: ImageCarouselComponent.Key,
            name: 'Block',
            images: [],
            autoRotate: true,
            rotationFrequency: '7000',
            blockWidth: 'screen'
        };
    }

    private generateImageItem(): any {
        return {
            title: '',
            content: '',
            url: ''
        };
    }

    addImage() {
        const group = this.formHelper.fillFormRecursively(this.generateImageItem());
        const images = this.getFormArray('images');
        images.push(group);
    }

    removeImage(index: number) {
        const images = this.getFormArray('images');
        images.removeAt(index);
    }

    getTitle(item: FormGroup) {
        return item.controls.title.value || '<empty title>';
    }

    getFormArray(name: string): FormArray {
        return this.group.get(name) as FormArray;
    }

    sortItems(event: SortEvent) {
        if (event.complete) {
            console.log(this.group);
        } else {
            const images = this.getFormArray('images').controls;
            const current = images[event.currentIndex];
            const swapWith = images[event.newIndex];

            images[event.newIndex] = current;
            images[event.currentIndex] = swapWith;
        }
    }
}
