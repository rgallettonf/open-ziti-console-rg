import {Component, OnInit} from '@angular/core';
import {SettingsService, ZitiSessionData} from "open-ziti-console-lib";
import {isEmpty} from "lodash";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loggedIn = false;
    title = 'Open Ziti Console';
    version = '';
    isAuthorized = false;
    displayNav = true;
    displayTool = true;

    constructor(private settingsService: SettingsService) {

    }

    ngOnInit() {
        this.settingsService.init();
        this.settingsService.settingsChange.subscribe((results:any) => {
            this.version = results.version;
            this.isAuthorized = results.session?.id;
            this.displayNav = !results.hideNav ?? true;
            this.displayTool = !results.hideTool ?? true;
        });
        this.settingsService.settingsChange.subscribe((settings: any) => {
            this.loggedIn = !isEmpty(settings.session.id) && !isEmpty(settings.session.controllerDomain);
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
