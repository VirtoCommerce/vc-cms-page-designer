import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appBlockHost]'
})
export class BlockHostDirective {

    constructor(public viewContainerRef: ViewContainerRef) { }

}
