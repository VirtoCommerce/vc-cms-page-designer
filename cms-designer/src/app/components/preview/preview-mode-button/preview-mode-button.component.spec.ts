import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { PreviewModeButtonComponent } from './preview-mode-button.component';

describe('PreviewModeButtonComponent', () => {
    let fixture: ComponentFixture<PreviewModeButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PreviewModeButtonComponent]
        });
        fixture = TestBed.createComponent(PreviewModeButtonComponent);
    });

    it('should display the correct title', () => {
        const modeName = 'test';
        fixture.componentInstance.title = modeName;

        fixture.detectChanges();

        const text = fixture.nativeElement.textContent;
        expect(text).toContain(modeName);
    });

    it('should display the correct icon', () => {
        const iconName = 'test';
        fixture.componentInstance.type = iconName;

        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.fa-test'));
        expect(el).not.toBeNull();
    });

    it('may be selected or not', () => {
        fixture.componentInstance.selected = true;

        fixture.detectChanges();

        let el = fixture.debugElement.query(By.css('.__selected'));
        expect(el).not.toBeNull();

        fixture.componentInstance.selected = false;

        fixture.detectChanges();

        el = fixture.debugElement.query(By.css('.__selected'));
        expect(el).toBeNull();
    });

    it('should execute onButtonClick method when click occured', () => {
        spyOn(fixture.componentInstance, 'onButtonClick');
        const type = 'test';
        fixture.componentInstance.type = type;
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('a'));
        el.triggerEventHandler('click', { });

        expect(fixture.componentInstance.onButtonClick).toHaveBeenCalled();
    });

    it('should emit change event with correct type when onButtonClick executed', (done) => {

        const type = 'test';
        fixture.componentInstance.type = type;
        fixture.detectChanges();

        fixture.componentInstance.change.subscribe(givenType => {
            expect(givenType).toEqual(type);
            done();
        });

        fixture.componentInstance.onButtonClick();
    });
});
