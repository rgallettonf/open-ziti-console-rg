import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SettingsService} from "open-ziti-console-lib";
import {ZitiDomainControllerService, ZitiSessionData} from "open-ziti-console-lib";
import {LoginService} from "../login/login.service";

@Injectable({
    providedIn: 'root'
})
export class SimpleZitiDomainControllerServic implements ZitiDomainControllerService {

    zitiSessionData: ZitiSessionData = {
        zitiDomain: '',
        zitiSessionId: '',
        expiresAt: ''
    }

    zitiSettings = new BehaviorSubject(this.zitiSessionData);
    constructor(private settingsService: SettingsService) {
        this.settingsService.settingsChange.subscribe((results: any) => {
            this.zitiSessionData.zitiSessionId = results.session.id;
            this.zitiSessionData.zitiDomain = results.session.controllerDomain;
            this.zitiSettings.next({...this.zitiSessionData});
            localStorage.setItem('ziti_session_id', results.sessionId);
            localStorage.setItem('ziti_controller_domain', results.controllerDomain);
        });

    }
}
