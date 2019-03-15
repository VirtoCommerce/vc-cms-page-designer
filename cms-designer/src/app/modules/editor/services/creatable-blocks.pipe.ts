import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'creatableBlocks'
})
export class CreatableBlocksPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        return Object.keys(value).map(x => <any>{
            key: x,
            value: value[x]
        }).filter(x => !x.value.static && !x.value.hide);
    }
}
