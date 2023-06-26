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

    constructor(private settings: SettingsService) {

    }

    ngOnInit() {
        this.settings.settingsChange.subscribe(results => {
            this.loginVersion = results.version;
        });
        this.settings.init();
    }
}
