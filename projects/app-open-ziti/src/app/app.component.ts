import {Component, OnInit} from '@angular/core';
import {SettingsService} from "open-ziti-console";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Open Ziti Console';
    auth = '';
    level = '';
    subtitle = '';
    time = '';
    message = '';
    type = '';
    loginVersion: any;

    constructor(private settingsService: SettingsService) {

    }

    ngOnInit() {
        this.settingsService.init();
        this.settingsService.settingsChange.subscribe(results => {
            this.loginVersion = results.version;
        });
    }
}
