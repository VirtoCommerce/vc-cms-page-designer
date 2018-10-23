import { ToolbarButtonComponent } from './toolbar-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ToolbarButtonComponent', () => {
    let fixture: ComponentFixture<ToolbarButtonComponent>;
    const mouseEventMock = { preventDefault: () => { }, stopPropagation: () => { } };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ToolbarButtonComponent]
        });
        fixture = TestBed.createComponent(ToolbarButtonComponent);
    });

    it('should display the correct icon when icon property set', () => {
        fixture.componentInstance.icon = 'test';

        fixture.detectChanges();
        const iconElement = fixture.debugElement.query(By.css('.fa-test'));
        expect(iconElement).toBeTruthy();
    });

    it('should set the correct title when title property set', () => {
        const title = 'test title';
        fixture.componentInstance.title = title;

        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain(title);
    });

    it('should execute onButtonClick method when click occured', () => {
        spyOn(fixture.componentInstance, 'onClick');
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('a'));
        el.triggerEventHandler('click', mouseEventMock);

        expect(fixture.componentInstance.onClick).toHaveBeenCalled();
    });

    it('should emit buttonClick when onClick executed', (done) => {
        fixture.detectChanges();

        fixture.componentInstance.buttonClick.subscribe(() => {
            expect(true).toEqual(true);
            done();
        });

        fixture.componentInstance.onClick(<MouseEvent>mouseEventMock);
    });
});
