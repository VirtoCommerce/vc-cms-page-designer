import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    presets: any;
    settings: any[];
    theme: {};

    isPageLoading = false;
    isThemeLoading = true;
    selected = null;

    constructor(private themeService: ThemeService) { }

    ngOnInit() {
        this.themeService.loadData().subscribe( ([presets, settings]) => {
            this.presets = presets;
            this.settings = settings;
            this.theme = { ...presets.presets[presets.current] };
            this.isThemeLoading = false;
        });
    }

}
