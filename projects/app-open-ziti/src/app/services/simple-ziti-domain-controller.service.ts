import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SettingsService} from "open-ziti-console";
import {ZitiDomainControllerService, ZitiSessionData} from "open-ziti-console";
import {LoginService} from "../login/login.service";

@Injectable({
    providedIn: 'root'
})
export class SimpleZitiDomainControllerServic implements ZitiDomainControllerService {

    zitiSessionData: ZitiSessionData = {
        zitiDomain: '',
        zitiSessionId: ''
    }

    zitiSettings = new BehaviorSubject(this.zitiSessionData);
    constructor(private settingsService: SettingsService) {
        this.settingsService.settingsChange.subscribe((results: any) => {
            this.zitiSessionData.zitiSessionId = results.sessionId;
            this.zitiSessionData.zitiDomain = results.controllerDomain;
            this.zitiSettings.next({...this.zitiSessionData});
        });

    }
}
