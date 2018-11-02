import { FormsHelper } from '../../services/forms.helper';
import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { BlockType, SectionModel } from '../../models';

@Component({
    selector: 'app-images-layout',
    templateUrl: './images-layout.component.html'
})
export class ImageLayoutComponent {
    static Key = 'image-layout';

    @Input() model: any;
    @Input() group: FormGroup;

    layoutOptions = [
        { label: 'One left, two right', value: 'one-two' },
        { label: 'Two left, one right', value: 'two-one' },
        { label: 'One left, one right', value: 'one-one' }
    ];

    static createModel(item: BlockType): SectionModel {
        return <SectionModel>{
            type: ImageLayoutComponent.Key,
            name: item.name,
            layout: 'one-two',
            images: [
                ImageLayoutComponent.generateImageItem(),
                ImageLayoutComponent.generateImageItem(),
                ImageLayoutComponent.generateImageItem()
            ]
        };
    }

    static createPreview(): SectionModel {
        return <SectionModel>{
            type: ImageLayoutComponent.Key,
            name: 'Images layout',
            layout: 'one-two',
            images: [
                ImageLayoutComponent.generateImageItem('http://www.flowermeaning.com/flower-pics/Zinnia-4.jpg'),
                ImageLayoutComponent.generateImageItem(
                    'https://www.sciencenews.org/sites/default/files/2017/08/main/articles/story-3_main.jpg'),
                ImageLayoutComponent.generateImageItem(
                    'https://avatars.mds.yandex.net/get-pdb/34158/3f879c3c-4489-4d14-afbe-8dd19049e269/s1200')
            ]
        };
    }

    private static generateImageItem(url?: string): any {
        return {
            title: '',
            url: url || ''
        };
    }

    getTitle(index: number): string {
        const list = this.getFormArray('images');
        return list.value[index].title.value || '<empty title>';
    }

    getFormArray(name: string): FormArray {
        return this.group.get(name) as FormArray;
    }

    getImageFormGroup(index: number): FormGroup {
        const list = this.getFormArray('images');
        return list.controls[index] as FormGroup;
    }

    isImageVisible(index: number): boolean {
        return index === 2 && !(this.group.controls.layout.value === 'one-one');
    }
}
