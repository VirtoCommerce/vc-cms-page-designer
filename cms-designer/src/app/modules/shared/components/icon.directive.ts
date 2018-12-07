import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
    selector: '[appIcon]'
})
export class IconDirective implements OnInit {

    @Input() appIcon: string;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit(): void {
        if (this.appIcon) {
            this.appIcon.split(' ').forEach(x => {
                this.renderer.setElementClass(this.el.nativeElement, x, true);
            });
        }
    }
}
