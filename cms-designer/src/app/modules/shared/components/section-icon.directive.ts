import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';

@Directive({
    selector: '[appSectionIcon]'
})
export class SectionIconDirective implements OnInit {

    @Input() appSectionIcon: string;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit(): void {
        const cssClass = 'fa-' + this.icon();
        this.renderer.setElementClass(this.el.nativeElement, cssClass, true);
    }

    private icon(): string {
        switch (this.appSectionIcon) {
            case 'text': return 'font';
            case 'image-carousel': return 'images';
            case 'textcolumns-with-images': return 'columns';
        }
        return this.appSectionIcon;
    }
}
