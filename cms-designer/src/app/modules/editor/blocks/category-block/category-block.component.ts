import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './category-block.component.html'
})
export class CategoryBlockComponent {
    static Key = 'category';

    @Input() model: any;
    @Input() group: FormGroup;
}
