import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {debounce, delay} from 'lodash';
import moment from 'moment';
import {SettingsService} from "open-ziti-console";


@Injectable({providedIn: 'root'})
export class WrapperControllerService {

    currentNetwork: any = {};
    _currentZitiControllerSession: any = {};
    zitiControllerSession = new BehaviorSubject<any>(this._currentZitiControllerSession);
    tokenExpirationDate: any = {};
    tokenRequests = 0;

    getZitiControllerSessionDebounced = debounce(this.getZitiControllerSession.bind(this), 10000, {leading: true});

    constructor(private settings: SettingsService
    ) {
        this.getZitiControllerSession();
    }

    getZitiControllerSession() {
        // const zitiControllerSession = {
        //     sessionToken: this.settings.user,
        //     domain: this.settings.controllerBaseUrl,
        //     expiresAt: result.expiresAt
        // };
        const zitiControllerSession = {
            sessionToken: this.settings.user,
            domain: this.settings.controllerBaseUrl,
        };
        this.tokenExpirationDate = moment(result.expiresAt);
        const expTime = this.tokenExpirationDate.diff(moment());
        let buffer = expTime - (1000 * 30);
        if (buffer < 10000) {
            buffer = 10000;
        }
        delay(() => {
            this.getZitiControllerSessionDebounced();
        }, buffer);
        this.setCurrentZitiControllerSession(zitiControllerSession)
    }

    setCurrentZitiControllerSession(zitiControllerSession: any) {
        this.zitiControllerSession.next(zitiControllerSession);
        this._currentZitiControllerSession = zitiControllerSession;
    }
}
