import {Component, OnInit} from '@angular/core';
import {SettingsService} from "open-ziti-console-lib";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Open Ziti Console';
    version = '';
    isAuthorized = false;
    displayNav = true;
    displayTool = true;
    showModal = false;
    constructor(private settingsService: SettingsService) {

    }

    ngOnInit() {
        this.settingsService.settingsChange.subscribe((results:any) => {
            this.version = results.version;
            this.isAuthorized = results.session?.id;
            this.displayNav = !results.hideNav ?? true;
            this.displayTool = !results.hideTool ?? true;
        });
    }
}
