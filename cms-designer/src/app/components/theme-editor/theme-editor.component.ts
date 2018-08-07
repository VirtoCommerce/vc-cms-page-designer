import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

    data: any;
    settings: any[];

    constructor(private themeService: ThemeService) { }

    ngOnInit() {
        this.themeService.loadData().subscribe( ([data, settings]) => {
            this.data = data;
            this.settings = settings;
        });
    }

}
