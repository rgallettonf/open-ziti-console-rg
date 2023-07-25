import {Component, OnInit} from '@angular/core';
import {SettingsService, ZitiSessionData} from "open-ziti-console";
import {isEmpty} from "lodash";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loggedIn = false;
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
        this.settingsService.settingsChange.subscribe((settings: any) => {
            this.loggedIn = !isEmpty(settings.sessionId) && !isEmpty(settings.controllerDomain);
            if (!this.loggedIn) {
                const sessionId = localStorage.getItem('ziti_session_id');
                const controllerDomain = localStorage.getItem('ziti_controller_domain');
                if (!isEmpty(sessionId) && !isEmpty(controllerDomain)) {
                    settings.sessionId = sessionId;
                    settings.controllerDomain = controllerDomain;
                    this.loggedIn = true;
                    this.settingsService.set(settings);
                }
            }
        })
    }
}
